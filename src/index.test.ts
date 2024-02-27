import supertest from "supertest";
import { expect, describe, it } from "vitest";

import app from "./app";

/**
 * NOTE: Arbitrum sepolia testnet api url sometimes goes down or takes to long to respond
 */
const request = supertest(app);

describe("GET /", () => {
  it("should return the Arbitrum API message", async () => {
    const response = await request.get("/");
    expect(response.status).to.equal(200);
    expect(response.text).to.equal("Arbitrum API");
  });
});

describe("GET /transactions/latest/:address", () => {
  it("should return the latest transaction for the given address", async () => {
    const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const response = await request.get(`/transactions/latest/${address}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("latestTransaction");
    expect(response.body.latestTransaction.from).toBe(address.toLowerCase());
  });

  it("should handle non-existent addresses gracefully", async () => {
    const address = "0xNonExistentAddress";
    const response = await request.get(`/transactions/latest/${address}`);
    expect(response.status).to.not.equal(500);
  });
});
