# INSTRUCTION OF ASSESSMENT

- [INSTRUCTION OF ASSESSMENT](#instruction-of-assessment)
  - [Introduction](#introduction)
    - [Assessment Specification:](#assessment-specification)
  - [Assignment Case Study Scenario](#assignment-case-study-scenario)
  - [Part 1: Cloud Services Research Report (Research) (15%)](#part-1-cloud-services-research-report-research-15)
  - [Part 2: Cloud Based Web Solution (Design, development) ( 85 %)](#part-2-cloud-based-web-solution-design-development--85-)
    - [Element 1:](#element-1)
    - [Element 2:](#element-2)
    - [Element 3:](#element-3)
    - [Element 4:](#element-4)
    - [Element 5:](#element-5)
    - [Element 6:](#element-6)
- [Marking scheme](#marking-scheme)


## Introduction

The assignment is designed to assess that students are able to research, develop and design a web-based solution that integrates third party web services and can be deployed on an appropriate cloud-based service as specified during the taught module.

### Assessment Specification:

The assessment for this assignment is in the form of a ‘Research, Design and Develop’ project worth 100% of the module marks covered by the learning outcomes. The assessment comprises a written report, website code and a video demonstration of a cloud solution with an oral explanation justifying the chosen cloud services. The report will describe the ethical considerations of the proposed solution including climate, technical, professional,security, commercial and economic issues and risks surrounding the development, operation and maintenance of computing systems in the context of the proposed scenario. The report should also contrast, compare and justify the chosen solution with an alternative approach such as a different solution by the same provider or a similar solution by a different provider. The website code will evidence the design and implementation of a web solution that integrates third party web application interfaces (APIs). The cloud solution and associated video will evidence the achievement of the solution requirements and offer a critical evaluation of the proposed solution.

## Assignment Case Study Scenario

You are a consultant working for a digital solutions company who have a contract for developing a web solution for a client. The client ‘Living Planet’ is a charity who are trying to improve air quality within the UK. Pollution within the UK is associated with numerous diseases and more recently the death of a 9 year old girl in London (https://www.bbc.co.uk/news/uk-england-london- 64624483 ). As part of their campaign for cleaner air they want a website which demonstrates what the air quality index is like in different parts of the UK. The purpose of the website is to raise awareness of the issue of pollution and to educate people about how their choices of travel, fuel use and general activities impact on the air we breathe. Living Planet have a sustainable objective to be climate positive by 2030. As part of their IT strategy, they have to demonstrate that they monitor the sustainability impacts of their IT infrastructure, including assessment of their cloud computing impacts, and evidence that they have sought opportunities to reduce these impacts.

Living Planet are looking for a mashup web solution that brings together data from a weather API and Google Maps API. The term ‘mashup’ refers to a hybrid web application that uses content from more than one source to create a new service – in this case a website that enables information about weather and air quality data visualised on a map. The solution should bring together weather and air quality data displayed on a Google map. When users select a point on the map they should be able to see information about weather and air quality related to that point on the map. The map and air quality functionality should be provided on the home page of the website.

Your organisation does not own a data centre or server for hosting client solutions on as all solutions are hosted on a cloud server. Your solution should be deployed to a cloud-based service provider as specified within the teaching material. You can choose a provider of your choice, but it is your responsibility to ensure that you have enough credits for the solution to be implemented during the assessment and marking period. If you run out of credits during the assessment and marking period it is your responsibility to find and deploy your solution to another cloud provider.

**Please note: this is not simply a website – this is a web solution that combines a number of APIs and technologies that is provided through a cloud service that you source.Cloud Solution Deliverables:**

- [ ] You will develop a web solution which should be compatible with any cloud service.
  - [ ] That is you may deploy your code on a web app, virtual machine or some other service and it should work without changes to the underlying source code.
  - [ ] Your cloud solution should be appropriately protected against common security issues.
  - [ ] You are expected to use the tools and technologies covered in the module.
  - [ ] That is, you should use PHP for your server-side code and jQuery for client-side programming.
  - [ ] We know there are alternative frameworks available, but these core technologies demonstrate your fundamental understanding of the technologies that underpin many modern frameworks.

## Part 1: Cloud Services Research Report (Research) (15%)

You are required to provide a short (no more than 1500 word) report on the cloud solution to be implemented. The report should cover the following topics:

1. A description of the chosen cloud solution including the type of solution provided and the
    name of the cloud provider used.
2. Pricing information for the package used. If this is a free package, i.e. it is trial package or
    you are using student credits or similar, then describe the terms and conditions of any free
    use and what the pricing will be once the free term is ended.
3. Describe how the chosen solution addresses the following ethical concerns:
    - Client sustainability targets.
    - Security and privacy concerns – this could include information about user accounts for accessing the cloud solution, sign in requirements for accessing any of the API features, information about firewalls and any other security or privacy measures taken.
    - Legal requirements – for example is the solution hosted in a particular region? If so why was this decision made, what are the cost implications and how does it allow the client to maintain GDPR requirements?

4. Provide a short handover plan for your solution. What information do you think your client will need to take over managing the cloud solution? You should consider whether they will be paying your organisation to manage the service or will they need to transfer any billing details over to their own organisation? What skills/information will someone need to access, manage, edit, stop, start etc the cloud solution provided?
5. Describe an alternative cloud solution that you could have used and present a justification for why the chosen solution fits the requirements better. It might help to have a comparative table between your solution and the chosen one which lists the different features e.g. cost, security, usability etc. You could discuss a similar solution from a different provider e.g. compare 2 different virtual machine options. Or you could discuss 2 different solutions from the same provider e.g. comparing a virtual machine against a web app.

## Part 2: Cloud Based Web Solution (Design, development) ( 85 %)

### Element 1:
- [x] Cloud-based service
- [ ] Appropriate security
  - [ ] Support the website and third party solutions used by other elements of the assignment
  - [ ] Suitable roles and user accounts
    - [ ] Configuring the service
    - [ ] Uploading web files to the service
    - [ ] IAM roles
    - [ ] Firewall security
    - [ ] where appropriate – different cloud services have different security features
    - [ ] The evidence of this element will be demonstrated via the video walkthrough of your cloud solution.
- [ ] Evidence given in the video and the link to the URL of the solution
  - [ ] Audio explanation of how each component is implemented
  - [ ] Demonstrate any security embedded into the solution such as

### Element 2:
- [ ] Create a website to showcase:
  - [x] the map
  - [ ] weather
  - [ ] air quality
  - [x] The website should contain a Google map.
  - [ ] The website should demonstrate best practice using
    - [ ] HTML5 semantic mark-up
    - [ ] CSS.
  - [ ] Coding should be structured well using
    - [ ] indentation
    - [ ] comments should be provided to evidence understanding of the code.
  - [ ] Other best practice can be evidenced through the file structure with assets and associated files organised accordingly i.e.
    - [x] scripts should be separate from the main web page files
    - [x] styles should be stored separately and
    - [x] images should be stored in an images or similar folder.
    - [x] If you are not sure about how to structure your files you can ask your tutor how this is best done – we accept there are a number of ways to do this
    - [x] a flat file structure is not acceptable practice.
  - [ ] Whilst the use of existing CSS frameworks and templates is not discouraged you must ensure that they contain best practice HTML5 and CSS mark-up as marks will be deducted for poor practice.
  - [ ] The website should be useable and should follow reasonable usability practice in terms of
    - [ ] layout
    - [ ] navigation
    - [ ] presentation.
  - [ ] Whilst we don’t cover web design or usability best practice you should have covered this in previous modules.
    - [ ] You may want to refer to the Nielson Norman Group for guidance on usability best practice (https://www.nngroup.com/topic/web-usability);
    - [ ] W3C also have some practical guidance on how you can make your website accessible and therefore useable (https://www.w3.org/TR/WCAG21/).
  - [ ] make sure that you simply don’t copy and paste code from the workshop material.
  - [ ] Any work that is submitted that is not your own should be properly referenced in a separate ‘About’ page within the website.
  - [ ] You will not receive any marks for code directly copied and pasted from the workshops – if you are unsure about this please speak to the tutor.

### Element 3:
- [ ] You should display air quality data for each city on the map. How you do this is up to you,
  - [ ] may want to consider something like having an icon which is geolocated onto the map for the city it relates to and
    - [ ] denotes whether air quality is good or bad for a city.
    - [ ] When the user hovers over the icon further air quality data should be provided within an info window.
    - [x] The air quality data can be sourced from the OpenWeather API covered on the module.
    - [x] Any of the air quality readings can be used to determine the air quality.
    - [ ] You can discuss with your tutor how best to determine whether air quality is good or bad.
    - [ ] When the mouse moves away from the icon marker the info window should be hidden.
    - [ ] If you use any icons that you haven’t created yourself you must correctly reference these images in the About page.

### Element 4:
- [ ] A user should be able to select a location on the map
- [ ] calculate the distance
- [ ] get the directions between the selected location and the Living Planet HQ which are located at NE1 8ST.
- [ ] You should use the Google Matrix distance service and directions service to calculate the distance and directions respectively.

### Element 5:
- [ ] You will create a web page that demonstrates implementation of the Google OAuth functionality.
- [ ] The page will provide a short description of the OAuth process and how it allows you to authenticate users to access certain elements of your website.
- [ ] The OAuth page should only be accessible when a user has authorised access to the page through the OAuth protocol.
- [ ] Your application should be registered with Google and authorised using the OAuth protocol.
- [ ] Users not signed into Google will need to sign in to Google, and then authorise the app (application).
- [ ] Users who are logged in to Google should be able to use your page directly, although they will still need to authorise the app.
- [ ] You should not directly copy the code from the labs for this exercise.
  - [ ] We accept that your code may be similar but only relevant code should be provided and you should write your own comments to describe what you think the code is doing.
  - [ ] If you are submitting any code that is not your own it should be properly referenced in the About page

### Element 6:
- [ ] Display weather forecast for Living Planet HQ by default on the homepage.
- [ ] Selecting a location on the map should update the forecast to contain the local weather for the geolocation of the selected location.
- [ ] Use any open weather API to access weather data.


# Marking scheme

| Component                                       | Mark Allocations |
| ----------------------------------------------- | ---------------- |
| **Part 1: Cloud Services Research Report**      | **0 - 15**       |
| **Part 2: Cloud Based Web Solution**            | **0 - 85**       |
| Element 1: Cloud Server Configuration           | 0 - 25           |
| Element 2: Website with embedded map            | 0 - 10           |
| Element 3: Air quality data and map markers     | 0 - 15           |
| Element 4: Distance and direction calculations  | 0 - 15           |
| Element 5: OAuth implementation and description | 0 - 10           |
| Element 6: Embedded weather information         | 0 - 10           |
| **TOTAL (%) 100**                               | 100              |
