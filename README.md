# AuthExamplePublic
Angular 2 example application for client-side authentication and routing.

Illustrates how to:
- Use Event Emitters with asynchronous authentication
- Use route guards
- Redirect to a protected page after login
- Show different home page based on whether user is authenticate or not
- Allow user to update their profile

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.14.

I created this application to learn more about:
- Client-side authentication
- Event Emitters
- Routing
- General Angular 2 concepts

I am sharing it publicly mainly for my Udemy class-mates, but also for anyone else that is interested in these topics.

If you want to take a great Angular 2 course, checkout out[Angular 2 - The Complete Guide](https://www.udemy.com/the-complete-guide-to-angular-2)

## How It Works

When the user first visits the site, they are present with the un-protected Home page.  They can click a button to sign in, or create a new account.

Once the user signs in, they will then be able to view all the protected pages which include the protect Home page, the two protected pages, as well as the user profile page (through the user dropdown on the right side of the menu bar).

If the user creates a new account, they will be taken to the user profile page, where they can update their Display Name, or leave it as their email address.  They can then view all the protected pages.

If an un-authenticated user tries to navigate to a protected page, they will be routed to the sign-in page. If they sign in, they will be re-directed to the original protected page that they tried to navigate to.

If a signed-in user refreshes a page in the browser, they will be routed to that page.  This will work for bookmarks as well.  As long as the user is still authenticated in the browser, the app will allow routing to protected pages. 

After signing out, the user is routed to the Signed Out page.

## Getting Started with the code

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.14.

If you use some other process for creating Angular 2 apps, or just do it from scratch, you should be able to take the contents of the src/app folder and the index.html file and use them in a new app. 

The application is setup to use Google Firebase for the backend authentication.  You can easily setup a free Google Firebase account by going [here](https://firebase.google.com/)

Once you get your account setup, you need to update the Firebase account settings in the index.html file, and remove the alert :)

If you don't want to use Google Firebase, You can easily use any backend authentication by implementing the AuthBackendInterface, and injecting it into the AuthService.

## WARNING

Please remember that this client-side authentication routing is "Eye candy".  IOW, it might be bypassed and allow an un-authenticated user to see a protected page.

**Please insure that protected pages use further authentication when retrieving and displaying data.** 

## Authentcaiton and Routing Overview

auth/AuthService: 
- Wraps the actual backend authentication service using auth/AuthBackendInterface.
- Emits the current user, as well as statuses and errors when authentication actions are performed (sign in, sign up, etc)

auth/AuthBackendFirebaseService:
- Actual implementation of Google Firebase authentication.

auth/ (various enumerations)
- These emuerations are used to wrap the statuses and errors emitted by the actual backend authentication service.  I developed them based on the Google Firebase api, but they are pretty generic for any authentication service.

auth/AuthGuardService
- Subscribes to the current user, and uses it to determine whether the user can be routed to protected pages.
- Translates a navigation to the Home page to the Protecte Home page if the user is authenticated.
- Redirects to the Sign In page if the user is not authenticated, and they are trying to view a protected page.  Passes the Url for redirection after sign-in.

## Known Issues

- Not mobile friendly
- If you see any problems with this code, please let me know.  Thanks!

## Improvements

- Add the authentication token to the User class?  I am not sure if this would be considered OK for security reasons??
- Implement some sort of login timeout, so that the users is logged out after a certain length of in-activity.
- Implement "Change Password" logic
- Implement "Change User Email" logic
- Implement email verification logic when creating new users.
