# AuthExamplePublic
Angular 2 example application for client-side authentication and routing.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.14.

I created this application to learn more about:
- Client-side authentication
- Event Emitters
- Routing

I am sharing it publicly mainly for my Udemy class-mates, but also for anyone else that is interested in these topics.
If you want to take a great Angular 2 course, checkout out[Angular 2 - The Complete Guide](https://www.udemy.com/the-complete-guide-to-angular-2)

# Getting Started

The application is setup to use Google Firebase for the backend authentication.  You can easily setup a free Google Firebase account by going [here](https://firebase.google.com/)
Once you get your account setup, you need to update the Firebase account settings in the index.html file, and remove the alert :)

If you don't want to use Google Firebase, You can easily use any backend authentication by implementing the AuthBackendInterface, and injecting it into the AuthService.

# Demo

You can view a working Demo [here](http://authexample.coderforchrist.com).

# Known Issues

- Not mobile friendly
- May not be using all of Angular 2 "Best Practices" since I am pretty new to Angular 2.
