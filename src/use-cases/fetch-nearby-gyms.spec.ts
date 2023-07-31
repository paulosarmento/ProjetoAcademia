import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe(" Fetch Nearby Use Case", async () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -22.468358,
      longitude: -45.5867212,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -22.1892715,
      longitude: -44.6198505,
    });

    const { gyms } = await sut.execute({
      userLatitude: -22.468358,
      userLongitude: -45.5867212,
    });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
