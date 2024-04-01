const Product = require("../models/Product");

module.exports = {
  createProduct: async (req, res) => {
    const newproduct = new Product(req.body);
    try {
      await newproduct.save();
      res.status(200).json("product created sucullfull");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  getallProduct: async (req, res) => {
    try {
      const allProducts = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  product: async (req, res) => {
    const Productid = req.params.id;
    console.log("====================================");
    console.log(Productid);
    console.log("====================================");
    try {
      const product = await Product.findById(Productid);
      if (!product) {
        return (
          res.status(404).json("Not found Product") && console.log(product)
        );
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  search: async (req, res) => {
    try {
      const results = await Product.aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json("failed to get the product");
    }
  },
  getVendorProducts: async (req, res) => {
    const animalshop = req.params.id;
    try {
      const product = await Product.find({ petsshop: animalshop });
      if (!product || product.length === 0) {
        return res.status(404).json("product not found in animalshop");
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json("failed to get the product");
    }
  },
  deleteProductasshop: async (req, res) => {
    const animalshopproduct = req.params.id;
    try {
      const product = await Product.findById(animalshopproduct);
      if (!product) {
        return res.status(404).json("product not found");
      }
      await Product.findByIdAndDelete(product);
      res.status(200).json("delete product successfully");
    } catch (error) {
      res.status(500).json("failed to delete the product");
    }
  },
  productAvailable: async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json("product not found");
      }
      product.foodAvailable = !product.foodAvailable;
      await Product.save();
      res.status(200).json("food available");
    } catch (error) {
      res.status(500).json("failed to change availability of the product");
    }
  },
  UpdateFoodId: async (req, res) => {
    const productId = req.params.id;
    try {
      const updateProductId = await Product.findByIdAndUpdate(
        productId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updateProductId) {
        return res.status(404).json("product not found");
      }
      await Product.save();
      res.status(200).json("product updated");
    } catch (error) {
      res.status(500).json("failed to update availability of the product");
    }
  },
  addFoodtags: async (req, res) => {
    const productId = req.params.id;
    const { tag } = req.body;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json("product not found");
      }
      if (Product.foodtags.includes(tag)) {
        return res
          .status(200)
          .json({ staus: false, message: "tag already exists" });
      }
      Product.foodtags.push(tag);
      await Product.save();
      res.status(200).json("successfully added");
    } catch (error) {
      res.status(500).json({ staus: false, message: "error saving tags" });
    }
  },
  gatRandomProductbycode: async (req, res) => {
    try {
      const productId = await Product.aggregate([
        { $match: { code: req.params.code } },
        { $sample: { size: 4 } },
        { $project: { _id: 0 } },
      ]);
      res.status(200).json(productId);
    } catch (error) {
      res.status(500).json({ staus: false, message: "error", error });
    }
  },
  addProductType: async (req, res) => {
    const productId = req.params.id;
    const productType = req.body.productType;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ staus: false, message: "not found", error });
      }
      if (Product.ProductType.includes(productType)) {
        return res
          .status(404)
          .json({ staus: false, message: "tag already exists" });
      }
      Product.ProductType.push(productType);
      await Product.save();
      res.status(200).json({ staus: true, message: "tag added successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getRandomByCategoryandCode: async (req, res) => {
    const { catrgory, code } = req.params;
    try {
      let product = await Product.aggregate([
        { $match: { category: catrgory, code: code } },
        { $sample: { size: 10 } },
      ]);
      if (!product || product.length === 0) {
        let product = await Product.aggregate([
          { $match: { code: code } },
          { $sample: { size: 10 } },
        ]);
      } else {
        product = await Product.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  categoryProducts: async (req, res) => {
    const categoryID = req.params.id;
    console.log(categoryID);
    try {
      const product = await Product.find({ category: categoryID });
      if (!product || product.length === 0) {
        return res.status(404).json("product not found in animalshop");
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json("failed to get the product");
    }
  },
  EditProduct: async (req, res) => {
    const productid = req.params.id;
    const animaldata = req.body;
    try {
      const exstingProduct = await Product.findByIdAndUpdate(productid,animaldata,{new:true, runValidators:true});
      if (!exstingProduct) {
        return res.status(404).json("NOT FOUND");
      }
      // (exstingProduct.title = animaldata.title),
      //   (exstingProduct.petsshop = animaldata.petsshop),
      //   (exstingProduct.description = animaldata.description),
      //   (exstingProduct.Bread = animaldata.Bread),
      //   (exstingProduct.price = animaldata.price),
      //   (exstingProduct.category = animaldata.category),
      //   (exstingProduct.petTags = animaldata.petTags),
      //   (exstingProduct.userId = animaldata.userId),
      //   (exstingProduct.isAvailable = animaldata.isAvialble),
      //   (exstingProduct.Rating = animaldata.Rating),
      //   (exstingProduct.ratingCount = animaldata.ratingCount),
      //   (exstingProduct.Shoplocation = animaldata.Shoplocation),
      //   (exstingProduct.shopAddress = animaldata.shopAddress),
      //   (exstingProduct.Days = animaldata.Days),
      //   (exstingProduct.Year = animaldata.Year),
      //   (exstingProduct.month = animaldata.month),
      //   (exstingProduct.Nails = animaldata.Nails),
      //   (exstingProduct.color = animaldata.color),
      //   (exstingProduct.eyeColor = animaldata.eyeColor),
      //   (exstingProduct.Gender = animaldata.Gender),
        await exstingProduct.save();
      res.status(201).json("succfulley UPDATE");
    } catch (error) {}
  },
};
