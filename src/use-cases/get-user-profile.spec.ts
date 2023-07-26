import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe(" Get User Profile User Case ", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });
  it("should be able to get user profile ", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "paulo.sarmento@hotmail.com",
      password_hash: await hash("1s2345", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });
    expect(user.name).toEqual("John Doe");
  });

  it("should be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
