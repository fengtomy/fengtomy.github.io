# Understanding cross-origin and CORS

## Intro

Cross-origin is a must-master concept as a front-end developer, and it's also one of frequently asked questions in interviews. I'll meet cross-origin problems in my daily work. It'll extremely impact your work efficiency and waste your precious time if you can't understand it well. You need to search for related documents to solve it everytime you encounter such problems. It's tough. At the meantime, this tutorial is compiled for my quick referrence to avoid such awkward time, to make my life easier. If you want to save your time like me when solving cross-origin problems, then you'd better continuing read it. I'll walk you through it to understand what is cross-origin, and how to solve it step by step. Without further ado, let's go!  
[related code](https://github.com/fengtomy/understanding-cors)  

## understanding cross-origin

When developing projects, we need to access backend resources. If you use XMLHttpRequest/axios/fetch to access backend resources(without properly implemented cors configuration), browsers will block that response due to security reason. Then it failed, and we can't retrieve corresponding responses. Browser console will log some cross-origin errors, such as (`Access to XMLHttpRequest at 'http://localhost:3000/cors' from origin 'http://localhost:3001' has been blocked by CORS policy`).
1. What's cross-origin? Put it simply, if two servers have different schemes/domains/ports, then client one wants to access the other server's resources. So cross-origin comes into play, and this request failed.  
2. Why cross-origin? It's a browser's feature. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the same-origin policy.  

## solution

After introducting it, maybe you will think that we can't get any cross-origin backend data, because browsers will block every cross-origin response. But in reality, many projects' frontend and backend's are cross-origin, and they are not deployed in the same origin, but why they still work well? So now we need to see CORS.  

CORS, a http-header based mechanism. It allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources. Namely with CORS, server can tell client(browser) that you should load my responses instead of directly blocking them, even if we are cross-origin.  

Now that we know what is CORS, we can solve it with what we have learned just now. Below I have listed several cross-origin problems, and use javascript code to replicate cross-origin cases and implement the corresponding solutions.

### Simple Requests

Simple Request, namely request that won't trigger preflight. A 'Simple Request' should meet all the following conditions:
1. One of the three http methods(GET/HEAD/POST)
2. Other than some headers automatically set by the user agent(for example, `Connection`、`User-Agent` etc), the only headers allowed manually set are `Accept`、`Accept-Language`、`Content-Language`、`Content-Type`. Please note below addtional restriction on `Content-Type`
3. The only allowed values for the `Content-Type` are `Application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`  
```javascript
// // backend/index.html
const xhr = new XMLHttpRequest()
xhr.open("get", "http://localhost:3000/cors", true)
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    const status = xhr.status;
    if (status === 0 ||  (status >= 200 && status < 400)) {
      console.log(xhr.responseText)
      return
    }

    // an error 
  }
}
xhr.send()
```
```javascript
// backend/app.js
if (req.url === "/cors") {
  res.end("hello cors");
  return;
}
```
Now we meet the first cross-origin problem. Browser console tells (`Access to XMLHttpRequest at 'http://localhost:3000/cors' from origin 'http://localhost:3001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`). So we attach specific header to our backend response to solve it.
```javascript
// backend/app.js
res.setHeader("Access-Control-Allow-Origin", "*")
if (req.url === "/cors") {
  res.end("hello cors");
  return;
}
```
The problem has been solved, and it's a simple-request.

### Preflighted Requests

Now we change some headers to make it beyond the simple-request range, for example changing http method to `put`/`delete`, or `Content-Type` to `application/json`. We'll find a different error (`Access to XMLHttpRequest at 'http://localhost:3000/cors' from origin 'http://localhost:3001' has been blocked by CORS policy: Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.`)
```javascript
// frontend/index.html
const xhr = new XMLHttpRequest()
xhr.open("get", "http://localhost:3000/cors", true)
xhr.setRequestHeader("Content-Type", "application/json") // ++
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    const status = xhr.status;
    if (status === 0 ||  (status >= 200 && status < 400)) {
      console.log(xhr.responseText)
      return
    }

    // an error 
  }
}
xhr.send()
```
So what's preflighted requests? Unlike simple requests discussed above, for "preflighted" requests the browser first sends an HTTP request using the OPTIONS method to the resource on the other origin, in order to determine if the actual request is safe to send. Cross-site requests are preflighted like this since they may have implications to user data. So after `OPTIONS` request, browser sends the actual one, but blocks that response, an error raising. How to solve it?

First, we find there're two headers in `OPTIONS` request that don't exist before:
  * Access-Control-Request-Headers: content-type
  * Access-Control-Request-Method: GET  

We can set corresponding headers to solve such problem in backend server
```javascript
// backend/app.js
res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Methods", "GET")
res.setHeader("Access-Control-Allow-Headers", "Content-Type")

if (req.url === "/cors") {
  res.end("hello cors");
  return;
}
```
Now there's no error in console, and the request succeeds.

### Requests with credentials

Often times backend servers are authority related, they will send back different data with the same request path due to different users/tenants, etc. So we will need HTTP Authentication information. In cross-origin requests(XMLHttpRequest/axios/fetch), browsers won't send authentication information by default, we need to manually set it.
```javascript
// frontend/index.html
const xhr = new XMLHttpRequest()
xhr.open("get", "http://localhost:3000/cors", true)
xhr.withCredentials = true // ++
xhr.setRequestHeader("Content-Type", "application/json")
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    const status = xhr.status;
    if (status === 0 ||  (status >= 200 && status < 400)) {
      console.log(xhr.responseText)
      return
    }

    // an error 
  }
}
xhr.send()
```
We find that a new error occurs(`Access to XMLHttpRequest at 'http://localhost:3000/cors' from origin 'http://localhost:3001' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.`)  

Now we assign frontend address to `Access-Control-Allow-Origin` to see what will happend
```javascript
// backend/app.js
res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001") // changed
res.setHeader("Access-Control-Allow-Methods", "GET")
res.setHeader("Access-Control-Allow-Headers", "Content-Type")
```
Another one error occurs(`Access to XMLHttpRequest at 'http://localhost:3000/cors' from origin 'http://localhost:3001' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.`)  

We continue to change `Access-Control-Allow-Credentials` value to `true`
```javascript
// backend/app.js
res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001")
res.setHeader("Access-Control-Allow-Credentials", "true") // ++
res.setHeader("Access-Control-Allow-Methods", "GET")
res.setHeader("Access-Control-Allow-Headers", "Content-Type")
```
That's it, we retrieve cross-origin response one more time as expected.

## Conclusion

After reading it, we get to know many cross-origin knewledge, and master general ways to solve cross-origin errors. This article is based on [MDN-cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), with simple code replicating cross-origin errors and solving them step by step. If you have any suggestion or find some errors ,please contact me [TWITTER](https://twitter.com/fengxh2)、<shangfxh@gmail.com>、QQ(1010454733). Thanks for your reading.  

NOTE: Nodejs code in this article is simple, without any business logic or security concerns. Please don't put it in prod environment.