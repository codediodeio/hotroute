# Hot Route

An zero-config router and prefetcher for static and/or server rendered sites. 

## Why?

HTTP is stateless. What if you could maintain state between full page changes without building an SPA? 

Ideal for static or server-rendered web apps using web components that want super fast page changes without losing stateful data in the JavaScript. Expect page loads under 50ms for your average blog post.

## How?

(1) It prefetches visible links in the page with intersection observer. (2) On click, swaps the body 

## Benefits

- Full control over SEO 
- Feels like an SPA
- Zero config

## Caveats

- It will not execute scripts in the body. 
- It will only 


## Docs

