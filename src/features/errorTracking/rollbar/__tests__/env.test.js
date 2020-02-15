import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const {
  parsed: { ROLLBAR_CLIENT_ACCESS_TOKEN },
} = dotenv.config({
  path: path.resolve(__dirname, `../../../../../.env.production`),
});

it('should include ROLLBAR_CLIENT_ACCESS_TOKEN in the .env.production file', () => {
  expect(ROLLBAR_CLIENT_ACCESS_TOKEN).toEqual(expect.any(String));
});

it('should have the same value in android manifest', () => {
  const strFilePath = path.resolve(
    __dirname,
    `../../../../../android/app/src/main/java/com/salonsuiteresourcecenter/MainApplication.java`,
  );
  const fileContent = fs.readFileSync(strFilePath).toString();

  expect(fileContent.includes(ROLLBAR_CLIENT_ACCESS_TOKEN)).toBeTruthy();
});

it('should have the same value in iOS manifest', () => {
  const strFilePath = path.resolve(
    __dirname,
    `../../../../../ios/SalonSuiteResourceCenter/AppDelegate.m`,
  );
  const fileContent = fs.readFileSync(strFilePath).toString();

  expect(fileContent.includes(ROLLBAR_CLIENT_ACCESS_TOKEN)).toBeTruthy();
});
