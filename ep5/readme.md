# Episode 5 - Puppeteer

## Folders

### bot-src

This folder contains basic code that let's you use puppeteer to control Chrome, and take a full page screenshot of a site

### Commands
`npm run start` will execute the code below, and run our puppeteer script

`npx ts-node index.ts`

`npx` runs a locally installed package, consider this as `bundle exec`

`ts-node` is a package allows us to run `TypeScript` files(.ts) without having to compile them to `JavaScript` files(.js) beforehand

`index.ts` the file to run with `ts-node`


---

### site-src

This folder contains the example website that we will be practicing on. Using actual websites is not recommended for testing since scraping does use up the site owner's resources

#### Commands
`npm run start` will spin up the webserver for us to use. It will run on port `:3000`

