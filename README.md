Brisbane Events Explorer - Search for events, filtering by desired criteria, such as weather conditions. 

An assignment for CAB432 (Cloud Computing) at QUT (2020). 

Written with NodeJS, using Pug and range of other NPM packages, then, using PM2, deployed in an autoscaling group with AWS elasctic load balancer. 



----------------------- Initial Project Proposal -----------------------
Overall mashup purpose and description 
The broad purpose of this application is to provide useful information about upcoming Brisbane events, to help users choose which events they will attend. 

Use Cases
Use cases will align with the following user stories: 
  1.	As a bored primate, I want the system to provide collated current and upcoming event information so that I can decide
  which events will best fill the void in my large cranial cavity. 
  2.	As a person who suffers from aquaphobia, I want the system to allow me to view events by weather type in the next few
  days, so that I can easily see suitable events for me to consider. 

Use of Services and API’s
API’s to be used here include: 
  1.	The Brisbane City Council Events feed, as used on the “What’s on in Brisbane” website and includes events such as:
  LIVE, Active parks, Brisbane Botanic Gardens events and more. 
    a.	This application will use the API’s JSON format, which provides the next 200 events, but it is also available in
    RSS and XML, which would provide up to the next 1000 events. More information is available here: 
    https://www.data.brisbane.qld.gov.au/data/dataset/brisbane-city-council-events 
    b.	This API applies to user stories 1 & 2. 
  2.	The Weather API current and forecast information for Brisbane. 
    a.	The application will use the API’s JSON format, which provides 3 days of weather forecasts for free (up to 20,000
    calls per month). More information is available here:  https://www.weatherapi.com 

Processing will be done as much as practically possible on the server side. The technologies to be deployed will include using the Ubuntu OS (18.04 LTS), Node JS, REST/JSON API usage, express middleware all packaged in a Docker container, which will then be deployed onto an AWS eC2 Linux VM, via a private code repository. 

