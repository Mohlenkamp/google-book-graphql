# google-book-graphql

Google Book Search Using GraphQL

## John Mohlenkamp
## Sept 12, 2021


## GitHub Location: https://github.com/Mohlenkamp/google-book-graphql

## Heroku Deploy Location: https://google-book-graphql.herokuapp.com/

## Description 
This program is dsigned to take an existing, working application that was written using the REST method and API routing, and comvert it to using GraphQL. The program is based on the Google Books API that allows users to create accounts, search against the Google Books API and save/remove their favorites.

You will need to create an account using the Sign Up navigation to use the save favorites feature, but you can use the Search for Books with/without an account.

## Important Deployment Note: 
    When I deployed this to Heroku, it broke something in the show/remove saved books mutation. You can create a new user and login no problem. You can also use the Save Books function, but (for some reason) after I deployed this to Heroku, the "See Your Books" feature doesn't work. You'll get the "Loading" message while it looks up your favorites, but then it just hangs. I'm still trying to find out why it's doing that, but I wanted to let you know about it. It should work fine if you manually deploy from GitHub. The Heroku deployment works for everything except that one function (for now).

Screenshot example of application:
![Screenshot](Screenshot.jpg)