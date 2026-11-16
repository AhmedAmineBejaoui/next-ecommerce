import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req,res) {
  await isAdminRequest(req,res);
  await mongooseConnect();
  res.json(await Order.find().sort({createdAt:-1}));
}
