# Electron-AguaLily

Electron-AguaLily is a management application that I have been developing to be able to keep an organized control of the activities carried out in the company. The objective of this is to be able to reuse the information collected and not just store it on paper, thus saving time and showing greater transparency to the activities carried out.

All these activities in one way or another did not have an exact control and something was required to be able to monitor them and have direct control.

This app is developed with the Electron JavaScript framework and MySQL Database. Complementing with other frameworks like Bootstrap, ChartJS, MomentJS & SweetAlert2.

<img src="https://user-images.githubusercontent.com/79732142/189031376-83cf92c3-7a70-48e6-99f7-796f40d074bf.png" alt="electron" width="100"/> <img src="https://user-images.githubusercontent.com/79732142/189031905-311b5c06-3dbe-4371-8aac-bc9639715424.png" alt="electron" width="100"/> <img src="https://user-images.githubusercontent.com/79732142/189032494-b4704e08-a47f-4290-998d-2620eb378747.png" width="100"/> <img src="https://user-images.githubusercontent.com/79732142/189032675-8e6595fe-8f4c-4f1f-81db-501733774cbc.png" width="100"/> <img src="https://user-images.githubusercontent.com/79732142/189032806-bbc008cf-7bc7-4684-adaa-f4fb2b197f77.png" width="100"/> <img src="https://user-images.githubusercontent.com/79732142/189032981-93029866-4fc3-4919-b382-8633063fe76f.png" width="100"/>

## FUEL SECTION

Previously in the company a notebook was used to take notes of each of the vehicles and to be able to put the data of the spent fuel of each vehicle. This is somewhat impractical because apart from that, a sheet of a notebook had to be established for that vehicle and when that sheet was filled out, another had to be established, thus breaking the order of the vehicles.

Apart from this, there was no control of how much fuel was in reserve, thus causing the vehicles to stop production when the fuel ran out.

**<p align="center"> Graphic interface</p>**

![image](https://user-images.githubusercontent.com/79732142/189023347-484afd99-35bd-436b-b9e1-1d6cad039d2c.png)

#### Fuel availability

By clicking on the 'Availability' button, the current fuel availability section is displayed, which interacts as consumption or refueling is recorded, respectively.

![showDisponibilidad](https://user-images.githubusercontent.com/79732142/189026819-c93764cd-2979-434f-a0b9-d9af7b090a67.gif)

#### View recorded data
In this section you can see the data already registered, with their respective filters. You can filter by vehicle number, from a date, between dates and all this combined.

![image](https://user-images.githubusercontent.com/79732142/189027508-856c4327-9bb7-4876-987c-184d3ad2d457.png)

When a particular vehicle number is filtered, a calculation is made of how much is the approximate consumed by that vehicle. In case there is a failure, it will be notified with different alerts.

![image](https://user-images.githubusercontent.com/79732142/189027874-369a9b2f-5480-4135-9287-75ea736878ac.png)

Alerts Example

![Alerts Example](https://user-images.githubusercontent.com/79732142/189028600-26d41e7c-3b6d-41dc-a1d5-100a72225f57.png)

## REPORTS SECTION
This section records all the incidents of the company, mainly in the dispatch area. I did this because the highest-ranking people wanted to keep a more organized control of the problems and how they were resolved and who would take care of this.

**<p align="center"> Graphic interface</p>**
Here are the functionalities of registering and consulting these incidents and below a summary of the current situation, showing statistics with ChartJS:

- Current status of tickets, percentage of open and resolved ones.
- Ticket resolution time depending on its severity.
- Tickets assigned to each person, which ones have been resolved and which ones are currently active.

![image](https://user-images.githubusercontent.com/79732142/189130651-0fee7841-464d-4222-b1f1-c0a0fc1f44cb.png)

#### Register Report

![RegIncidencia](https://user-images.githubusercontent.com/79732142/189137362-940b0223-f881-415c-bb1e-5e70e036926a.gif)

#### Show registered reports

![showReports](https://user-images.githubusercontent.com/79732142/189139371-dee447a1-1348-41ca-a4eb-ef34e3913b44.gif)

## Product shipping and delivery area
This section covers the area of products that are shipped, thus ending the other with what was done on paper by hand. With this implementation it is no longer necessary to have to keep track of paperwork since now the data goes directly to the cashier area.

In the development of this section I have used SweetAlert2 for the alerts, when validating the data an alert is triggered telling the user in which area the error is, thus prohibiting failures in the insertion of data.

https://user-images.githubusercontent.com/79732142/189143858-ea35bff1-43f9-4958-94bd-5ab580dbf735.mp4

<video width="320" height="240">
  <source src="https://user-images.githubusercontent.com/79732142/189143858-ea35bff1-43f9-4958-94bd-5ab580dbf735.mp4" type="video/mp4">
</video>




### I'm currently documenting the app, please come back in a few hours... 😊😊👌
