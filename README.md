# hotroute ⚡

Status: Experimental 🧫

An 2.5kB zero-config router and prefetcher for static or server-rendered sites.

## Why?

HTTP is stateless. What if you could maintain state between full page changes without building an SPA? 

Ideal for static or server-rendered web apps using web components that want super fast page changes without losing stateful data in JavaScript. Expect page transitions **under 50ms** for an average blog post on an average network. 

## How?

(1) It prefetches visible links in the page with intersection observer, thanks to [quicklink](https://github.com/GoogleChromeLabs/quicklink). (2) Intercepts click and popstate events, then updates the HTML5 history on qualifed route changes.  (3) Swaps the body out, while preserving most of the head (will change title and meta tags automatically).

This means if you use a global state management system, i.e. Angular DI or React Context or just plain old JS, your static content will change, but your web components will maintain state betten HTTP requests. 

It will fallback to standard naviation if `window.history` does not exist. 

## QuickStart

```
npm i hotroute
```

```js
import hotroute from hotroute;
const router = hotroute();
```

That's it. Magic (maybe too much).


## Advanced Usage

```js
// with opts 
const router = hotroute({ log: true, prefetch: true });

// Navigate manually
router.go('/somewhere');

// Listen to events
window.addEventListener('router:fetch', showLoader);
window.addEventListener('router:end', hideLoader);
```

### What is happening in the DOM?

Here's how things change in the DOM on a navigation event. 

```html
<head>
    <!-- meta tags change -->
    <meta name="description" content="my cool page">

    <!-- title changes -->
    <title>Document</title> 

    <!-- everything else does NOT change -->
    <script src="my-bundle.js"></script> 

    <!-- head scripts or nodes can be re-evaluated with data-reload -->
    <script data-reload src="my-other-bundle.js"></script> 
</head>
<body>
    <!-- ALL body content changes -->
    
    <!-- nodes can be cloned with data-stateful -->
    <nav data-stateful></nav> 
</body>
```

### Caveats

- Body scripts will never run (but you should be using defer anyway)

