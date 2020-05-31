![Build and Deploy to Cloud Run](https://github.com/ujwaldhakal/things-for-granted-svelte/workflows/Build%20and%20Deploy%20to%20Cloud%20Run/badge.svg)
## Daani

Since we are throwing away many consumable goods which could have been helpful for others. 
So this is the place where you list your things out instead of throwing it away. Just visit xxx , register and list down
your products and the one who will need will contact you. Lets spread the happiness.

## Technologies used 

* [Sapper](https://sapper.svelte.dev/) Why ? Its the next hype for frontend , if you dont believe me try it out how easy 
and simple it s
* Bootstrap 
* Apollo 

## Installation
* Clone this repo
* cp .env.example .env  check api url accordingly
* Run `yarn`
* Run `yarn dev` it should run development on localhost:3000

## Folder Structure

* `/src` is where application logic is
* `static` where all our static assets belongs 
* `src`
    * `assets` -: All our sass files resides here which are broken down into modules.
    * `components` -: These are the smaller functioning units of a page like `products lists`, `header`, `footer` etc
    * `entity` -: They are the main actors of our app and they handles all the api actions like `create`,`edit`,`delete`,`update`
    * `layout` -: This handles common layout like `authorized dashboard` and `public` layout for now.
    * `routes` -: All our routes are handled by file name its just like nuxt and next.
    * `services` -: They are basically reuseable things like `graphql settings,stores,storage` etc  
    
    

Our society wants more contribution !

## Contribution Guidelines
* If you found out a bug please create an issue
* If you want to request any feature just create a feature tag issue
* All codes must tested well on local machine before pushing it to production
 
Our backend is powered by [Argon template](https://www.creative-tim.com/product/argon-dashboard) 
