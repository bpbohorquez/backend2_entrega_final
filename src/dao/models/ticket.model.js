import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ticketsCollection = "tickets";

const ticketsSchema = mongoose.Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: Date, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

ticketsSchema.plugin(mongoosePaginate);
const ticketModel = mongoose.model(ticketsCollection, ticketsSchema);

export default ticketModel;
