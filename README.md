moat-nautical
=============

Display nautical miles between airports

This is a web app backed by AngularJS and Express application frameworks,
and supported by the Google Maps Javascript API, and OpenFlight's data 
compilation of US airports. Autocompletion is implemented using JQueryUI.

The Express application exposes a simple REST endpoint for querying 
airports, the set of which it reads from an O.F. csv file:

```
  GET /airports          RETURNS complete list of airport names and IATA codes
  GET /airports?q=query  RETURNS airport metadata for the given query
```  
  
The list of airport names is used for the autocomplete functionality.

Demo: 

http://entangible.com:8123/#/
  
  
