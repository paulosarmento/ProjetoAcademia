/* eslint-disable prettier/prettier */
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe(" Authenticate Use Case ", () => {
  it("should be able to authenticate ", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "paulo.sarmento@hotmail.com",
      password_hash: await hash("12345", 6),
    });

    const { user } = await sut.execute({
      email: "paulo.sarmento@hotmail.com",
      password: "12345",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email ", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() =>
      sut.execute({
        email: "paulo.sarmento@hotmail.com",
        password: "12345",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email ", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "paulo.sarmento@hotmail.com",
      password_hash: await hash("12345", 6),
    });

    expect(() =>
      sut.execute({
        email: "paulo.sarmento@hotmail.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
