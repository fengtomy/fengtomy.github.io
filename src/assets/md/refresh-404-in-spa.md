# 404 error on page reload in React and React-Router projects

Simply, this is a problem happening only in production mode for your hosting platform, like Github Pages, Netlify, .etc.  
Everything in development is OK. After deployment, when you refresh a page with a nested route, like `https://namespace.domain.com/blog-post/article`, the service hits 404, and tells you that file or directory not found. The message will vary depends on your hosting.  
Why will it happen, and how can we solve it? Today I will walk you through the reason and the solution. Let's get started.

## Client-side routing in services

It's not a problem specific to React and React-Router projects. All SPAs suffer from the same problem.  
The problem is that client side route only loads one "page" from the server. Server only knows one single route, that is `index.html`. Then it serves client side JS to browser in order for your SPA to work.  
And routing is a client side behavior. In React it's usually handled by React-Router library. In order for the routing to work your app needs to load the home page, along with all JavaScript code. That is to say, if a user directly goes to another route, i.e. `/about`, `/blog-post`, or directly refreshes with a non-root url, he will see a 404 error.  
The server doesn't know anything about route `/about`. In its view there's only one page - `index.html`. So when browser requests for `/about`, the server correctly responds with 404 without any hesitation.  
And as a developer you won't meet this situation during development, since most dev servers redirect all requests to `index.html`. As far as I know, Vite, Vercel configure this by default in local development.

## Solution

Tell your service to respond with the `index.html` for any route. Since basically it contains all JavaScript files, it will do the routing correctly controlled by client side React Router, and users will see correct page based on different routes.  
We can configure most static hosts to redirect all requests to the home route. But different hosts have different configurations. You'd better search for corresponding host docs for something like "SPA routing".  

### Github Pages

I met this awkward situation when I ever deployed my blog posts website to Github Pages. I wrote a blog post and I shared the blog url with my friends but surprisingly they couldn't see ths blog. The resources on Github Pages aren't owned by me, so I cannot configure the service logic.  
Since Github Pages respond with default 404 page, I choose to create a `404.html`, which is purely a copy of my `index.html`. Now the browser can correctly render the blog content.   
Below is an example with Vite. `postbuild` do the copy work after build.
```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "postbuild": "cp dist/index.html dist/404.html",
  }
}
```

## Reference Links

* [Notes on client side routing - Create React App](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing)
* <https://github.com/facebook/react/issues/26669>
* <https://github.com/rafgraph/spa-github-pages>
