import * as alt from 'alt-server';
import Auth from "./auth.js";
import Vehicle from "./vehicle.js";
import Admin from "./admin.js";

function getOperation(player: alt.Player, type: "auth" | "character" | "vehicle" | "admin" | "account", operation: string) {
  if (type === 'auth') return new Auth(player)[operation];
  if (type === 'vehicle') return new Vehicle(player)[operation];
  if (type === 'admin') return new Admin(player)[operation];

}