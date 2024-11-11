# Lendsqr Frontend Engineer Assessment

This is my project submission for a front-end developer take home job assessment.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge/User Stories

- **Login Page**:
The Login page should allow users to input credentials and log in to access the dashboard. It should be pixel-perfect, matching the Figma design, with proper input validation and error handling. The page must be mobile-responsive, ensuring users can easily interact with the form on both desktop and mobile devices.  

- **Dashboard Page**:
The Dashboard page displays an overview of key information after a user logs in. It must closely mirror the design from the Figma file and be responsive across all screen sizes, ensuring a consistent user experience on both desktop and mobile.  

- **User List Page**:
The User List page should fetch and display a paginated list of 500 users from a mock API. It must be mobile-responsive, with smooth scrolling and navigation. The design should be implemented with high fidelity to ensure consistency and ease of use.  

- **User Details Page**:
The User Details page displays individual user information, fetched from the mock API. It should utilize local storage or IndexedDB to store and retrieve user data efficiently. The page must be responsive, ensuring users can view details clearly on both desktop and mobile.  

- **Additional Requirements**:
Ensure the entire app is responsive and visually matches the provided Figma design. Write clean, well-structured code with proper variable and function naming conventions. Implement unit tests to cover both positive and negative scenarios, and document the project thoroughly in the README, including setup instructions and clear commit history.  

### Screenshot

![](/public/screenshot-desktopnew.png)

### Links

- Solution URL: [https://github.com/traez/lendsqr-fe-test](https://github.com/traez/lendsqr-fe-test)
- Live Site URL: [https://tochukwu-ezeokafor-lendsqr-fe-test.vercel.app/](https://tochukwu-ezeokafor-lendsqr-fe-test.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox and CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Typescript
- Nodejs      
- React Icons  
- Tanstack       
- SCSS (SASS)  
- Jest  
- React Testing Library      

### What I learned
   
- **Next.js and Turbopack**  
I had my first experience using Turbopack for Next.js development. I worked with Next.js 15 and React 19.     
- **Dependency Management**  
I encountered some dependency issues due to using newer versions of React and Next.js. To overcome this, I had to use the `--legacy-peer-deps` flag during installation.   
- **SCSS Introduction**  
This was my first time using SCSS (Sass). I learned that Next.js natively supports Sass, so I could just swap out my Global.css file. I also realized that two key features of SCSS - nesting and variables - are now available in vanilla CSS, which makes me wonder if SCSS might become less necessary over time.  
- **Sass Configuration**  
I ran into a Sass deprecation warning in the console. I fixed it by adding the following to my `next.config.ts`:
`const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  }
}  `
- **Sass Modularity**  
I learned about the `@use` and `@forward` rules in Sass, which help make styling more modular.   
- **Layout Best Practices**  
I discovered some important layout considerations:  
1) Always ensure the parent container has a defined height when using flex-grow on its children.  
2) Add `margin: 0; padding: 0; box-sizing: border-box;` to the universal selector (*) to reset default styles and prevent scrollbar issues.     
- **Custom Font Integration**  
I learned how to load and use local custom fonts in Next.js.   
- **TypeScript and React Styling**  
I used `CSSProperties` from React for the first time, which helped me with type-checking inline styles in TypeScript.   
- **CSS Methodology**  
I implemented the BEM (Block Element Modifier) methodology for CSS class naming. It really helped improve the structure and maintainability of my styles.   
- **Mock API Usage**  
I used [https://mockaron.com/](https://mockaron.com/) to generate fake API data for my project.   
- **Number Formatting**  
I learned how to format numbers using `Intl.NumberFormat`. For example, I used it to format user balances like this:
`new Intl.NumberFormat("en-US").format(userInfo) `  
- **Unit Testing Insights**  
I realized I need more practice with unit testing, especially in applying both positive and negative scenario testing.   
- **Screen Recording and Explanation**  
I used Loom – Screen Recorder & Screen Capture, an alternative to "Awesome Screen Recorder & Screenshot", to record a screen capture of my app, source code, and to explain the build process.    

### Continued development

- More projects; increased competence!

### Useful resources

Stackoverflow  
YouTube  
Google  
ChatGPT

## Author

- Website - [Zeeofor Technologies](https://zeeofortech.vercel.app/)
- Twitter - [@trae_z](https://twitter.com/trae_z)

## Acknowledgments

-Jehovah that keeps breath in my lungs
