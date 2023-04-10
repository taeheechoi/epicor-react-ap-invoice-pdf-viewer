### About
The application allows users to enter the relevant information, such as the company, vendor number, and invoice number, and then fetches and displays the corresponding invoice information from Epicor.

### SQL query
``` 
select * from ice.XFileAttch where RelatedToFile = 'APInvHed' and XFileRefNum = 
select * from ice.XFileRef where XFileRefNum = 
```
- Key1: Vendor Number
- Key2: AP Invoice Number
- XFileRefNum: File Ref Number for file location. 

### Reference
- ChatGPT
- https://levelup.gitconnected.com/displaying-pdf-in-react-app-6e9d1fffa1a9
