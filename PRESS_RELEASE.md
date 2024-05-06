#  The Lighthouse

  

Authors:

- Justin Watson

- Jordy Lopez

- Tahj Amie

  

Team Name:

  

##  😞 The Problem

Homelessness is a major issue in NYC, impacting individuals and communities profoundly. Lack of shelter, healthcare, and job opportunities makes it tough for homeless people to regain stability and feel connected. Streamlining access to vital resources is crucial in tackling this challenge, and achieving this involves enhancing communication among organizations to strengthen an individual's care journey.

  

##  📝 Summary

In recent years, homelessness in New York City has surged to its highest levels since the Great Depression, with a staggering 92,879 homeless individuals, including 33,399 children, seeking shelter each night in the city's municipal shelter system as of November 2023. This crisis is exacerbated by a multitude of factors, including a severe shortage of affordable housing, triggering causes such as eviction and domestic violence, and the prevalence of serious health issues among homeless single adults, including mental illness and addiction disorders. Despite efforts to accommodate asylum seekers and new arrivals, the total number of people sheltered in various systems has reached approximately 123,000 by December 2023. Furthermore, while homelessness disproportionately affects Black and Hispanic/Latinx New Yorkers, it spans across all community districts, underscoring the pervasive nature of the issue within the city's fabric.

  

##  🤔 Our Hypothesis

If organizations working with homeless individuals have access to communication avenues of resources tailored to different neighborhoods, such as resources or space in shelters, then they will be better equipped to provide holistic support, leading to more effective long-term solutions and reducing the cycle of homelessness.

  

##  📱 Product Overview

Our product offers a centralized platform connecting organizations with tailored resources and support networks to help navigate their clientele out of homelessness or prevent homelessness to begin with. Users contribute by submitting local resource information, leaving reviews, coordinating donations, and accessing event calendars for community support.

  

##  🏙️ Mission Statement

Our application exists to address the pressing issue of homelessness in NYC by providing advocates with an organized platform to pool together resources, alleviating the need for extensive internet searches and ensuring that support is readily available for individuals in need, regardless of their neighborhood. By streamlining essential information on shelters, food banks, healthcare facilities, and other vital services, our product empowers advocates to efficiently connect homeless individuals with the resources they require to regain stability and rebuild their lives.

  

##  🫂 Who do we serve?

Although the homeless are the main beneficiaries of this program, they may not have immediate internet connection. People who work with the homeless, such as social workers, churches, police officers, food banks, shelters, nonprofit organizations, community centers, mental health/substance abuse treatment centers, schools, and various social media advocacy groups, will be the primary users of this app.

  

##  🧳 User Journey Map

Jessica, a social worker who specializes in assisting victims of domestic violence, begins by assessing an individual who is at risk of homelessness. Jessica is worried that if they leave their violent circumstances without a detailed safety plan, the victim won’t get the proper help they need. The ideal plan is to develop a safety strategy, but that requires many moving parts and resources that need to be gathered, and Jessica does not know where to start. She uses the application to tailor a selection of resources based on the individual's needs and location in NYC. She arranges for quick, practical support for the sufferer by contacting local services through the application. Furthermore, Jessica provides continuing support to help the individual move to a more secure existence, emphasizing a comprehensive approach that goes beyond simply providing resources.

  

##  👥 User-stories

###  User Story 1- Reading Posts:

As a social worker, Jessica wants to find resources for her client, a victim of domestic violence at risk of homelessness. She navigates to the "/resources" page on the application, which provides a posts feed that displays an assortment of the most recent posts. However, she needs something a bit more tailored to her client’s situation. Luckily, there are buttons above the feed that will render resources for specific categories such as “/shelters”, "/support groups," and "/food banks".

  

**Tables needed for this user story:**

- users (id*, name, role)

- resources (id*, category_id, name, description, address, contact_info)

- category(id*, name)

  
  

###  User Story 2- Making posts:

As a community member, Maria wants to contribute to the application by adding information about a local shelter she volunteers at. She visits the "/shelters" page and clicks on the "Contribute" button. Maria fills out a form with the shelter's name, address, contact information, and any additional details. After submitting the form, Maria's contribution is added to the database for others to access.

  

###  User story 4- Editing Posts:

Maria notices a couple of typos in the contact email she posted for her shelter.

  

###  User Story 3- Reading Events:

As a staff member at a local food bank, Sarah aims to connect visitors with additional resources beyond food assistance. She accesses the "/calendar" page on the application, seeking events related to donated goods. Navigating to the "Donated Goods" category, Sarah discovers an event titled "Clothing and Socks Giveaway for the Homeless" scheduled for next Saturday. She notes the date, time, and location to inform food bank visitors about the opportunity to access essential items.

  

**Tables needed for this user story:**

- users (id*, name, role)

- Calendar (id*, category_id, time, date, location, user_id, organization_id)

- Category (id*, name)

  

###  User Story 4- Creating Events:

As a volunteer at a local church, Samantha wants to organize a clothing drive for the homeless community in her neighborhood for May 15th at 2 pm. She clicks on the calendar button to access the calendar page, and adds a clothing drive event to the calendar, specifying the date, time, and location as well as the organization she’s associated with.

  

###  User Story 5- Editing Events:

Samantha realizes that there was a miscommunication regarding the start time of the clothing drive. The date is actually May 17th at 12pm. She navigates to her profile page and views her created posts to find the clothing drive event. She clicks on the post, which directs her to the post’s page. Because she is logged in and has authorization to edit that specific page, she sees an option to edit the form and change whatever she needs to change.

  

###  User story 6:

Damien started a nonprofit food bank in his neighborhood but thinks it needs more online presence. He clicks the sign-up button to register his organization's name and email. Now, whenever someone from his food bank signs up, they can easily select their organization from the list.

  

**Tables needed for this user story:**

 - users (id*, name, role, organization_id, password_hash)
 -   Organizations (id, name)

  

###  User story 7- Authorization/ Authentication:

As a project manager for a social services agency, Alex needs to track the allocation of resources efficiently. Alex tries to access the resource section but hits a roadblock—he needs to sign up and log in first. He is greeted with a form that contains
