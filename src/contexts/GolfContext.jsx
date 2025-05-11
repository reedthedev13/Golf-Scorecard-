import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export const GolfContext = createContext();
