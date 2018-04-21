import { Test } from '@nestjs/testing';
import { CreateUserCommand } from './create-user.command';

describe(`Create User Command`, () => {
  it(`Is constructed correctly`, async () => {
    const username = 'foo';
    const password = 'bar';
    const email = 'foo@bar.com';
    const firstName = 'Foo';
    const lastName = 'Bar';

    const command = new CreateUserCommand(
      username, password, email, firstName, lastName
    );

    expect(command).toMatchObject({
      username, password, email, firstName, lastName
    });
  });
});