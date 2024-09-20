import passport from "passport";
import local from "passport-local";
import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;
