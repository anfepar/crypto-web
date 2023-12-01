# Crypto Currencies Web
## [App URL](https://crypto-web-five-nu.vercel.app/)
## Introduction

This project is a **Next.js** application that displays a list of cryptocurrencies, their exchange rates to USD, and the price in BTC. It also includes a detailed page for each cryptocurrency. The development process, architecture, and tech stack are explained in detail throughout this documentation.

## Contents

- [Tech Decitions](#tech-decitions)
  - [Arquitecture](#arquitecture)
  - [Why Next.js 14?](#why-nextjs-14)
  - [Why TypeScript?](#why-typescript)
  - [Why Tailwind?](#why-tailwind)
  - [Data management decisions](#data-management-decisions)
- [Future work](#future-work)

<a name="tech-decitions"></a>
## Tech Decisions
<a name="arquitecture"></a>
### Arquitecture
![Untitled drawio_(2)](https://github.com/anfepar/crypto-web/assets/22940371/a61154e0-90c2-452e-bd0f-c08f421e6d98)

This app is developed using Next.js and utilizes the App Router configuration. Next.js Server Render is responsible for making API requests to improve the initial page load and enhance SEO indexation by providing quick HTML responses. Additionally, the app is stored on Github and hosted on Vercel, which handles the build of the Next code and hosts it on a server.

To improve the development process, it also utilizes Tailwind for styles, Jest, and React Testing Library for testing.
<a name="why-nextjs-14"></a>
## Why Next.js 14?

Next, provide various facilities to simplify the development process with React and ensure a well-performing app. Additionally, Next.js has a large and active community, which helps to solve problems efficiently. The latest updates of Next.js aim to make the creation of a React App more intuitive.

Configuring App Router is an ideal way to start a project because it avoids the need to tightly couple Components with Next.js solutions.
<a name="why-typescript"></a>
## Why TypeScript?

TypeScript, as a strongly typed language, helps you maintain a consistent project by allowing you to define types, interfaces, and structured code. It makes it easier to understand how different code elements interact and helps developers avoid making errors.
<a name="why-tailwind"></a>
## Why Tailwind?

Tailwind is a CSS framework that helps facilitate the styling process during development. It helps avoid overwriting attributes and redefining the same classes multiple times.
<a name="data-management-decisions"></a>
## Data Management Decitions

There are three options that I analyzed to make the best decision for this project:
1. [Implement a Flux architecture using react toolkit](https://github.com/anfepar/crypto-web/pull/6)
   As the first option, I decided to use a Flux architecture using redux-toolkit to simplify the redux configuration. This is due to the simplicity of the store, reducers, and actions.
   ## Performance test
  <img width="840" alt="Screenshot 2023-11-30 at 10 40 24 PM" src="https://github.com/anfepar/crypto-web/assets/22940371/dbf17866-91ac-4d24-b0cb-e928d0558c5e">
  However, after analyzing the performance test results, I found that a Flux architecture is not the best approach in terms of performance. This is because the store state is simple and there is no shared state that justifies the implementation   
  of redux.
  
2. [Implement a Flux architecture using react toolkit and SSR](https://github.com/anfepar/crypto-web/pull/5)
   To improve performance, I considered using SSR (Server-Side Rendering) to fetch the cryptocurrency data and hydrate the redux state on the client side.
   ## Performance test
   <img width="840" alt="Screenshot 2023-11-30 at 10 34 35 PM" src="https://github.com/anfepar/crypto-web/assets/22940371/cc57269d-cba9-4bf4-91b5-205054d63677">
   Although the performance improved, the complexity of the project increased due to the configuration required for hydrating the redux state from the server to the client.
   
3. [Implement Next.js SSR without Redux](https://github.com/anfepar/crypto-web)
   Finally, I decided to use Next.js SSR without Redux configuration because I believe it is the best option in terms of balancing performance and complexity.
   ## Performance test
  <img width="840" alt="Screenshot 2023-11-30 at 10 36 27 PM" src="https://github.com/anfepar/crypto-web/assets/22940371/4d788392-3744-4d86-bbcc-d2afdc1f1998">
  
<a name="future-work"></a>
## Future work
- [ ] Realtime update of crypto currency data
- [ ] End to End testing
- [ ] Improve SEO adding metatags, aria-labels and HTML structure

    
