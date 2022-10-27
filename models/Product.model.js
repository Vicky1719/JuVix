const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ["maquillaje", "ropa", "cuidado-de-la-piel", "estilo-de-vida"],
    },
    supplier: [
      {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
      },
    ],
    administrador: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
<<<<<<< HEAD
  },
=======
    image: String
},
>>>>>>> 1e28c041da7d2defd55ef29bf1042c9ca82e5826
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
