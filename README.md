ServerRound distributed Network
Implementation of a distributed network with a simple RoundRobin load balancing controlled by a reverse middleware.
The purpouse is to show data from different companies in an event in a pdf file, querying the data from a database. The network uses 3
databases swaping each one in each request. 
If any of these data base services fails a Linux batch tryes to restart the Node service, if
this doesn´t work tryes to restart the database directly. If this reset doesn´t works the batch execute a command to return the program to
a previous git version. If the server still returning a http error code then the batch sends a mail to the network supervisor to notify 
the issue.
