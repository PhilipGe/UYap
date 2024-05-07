# UYap
UYap is a platform for UMass students to communicate freely with each other.


Our application has four views, a login view, a sign-up view, the home page, and a view for creating a post.


After running the milestone-02 script, you will be brought to the login page. We have a login and sign-up section, where we use our pouch db and we save all of the usernames and passwords. The application will correctly verify if the inputted username and password are valid, correctly log you in, and keep you logged in even in other sessions. However, if the password doesn’t match the username or if you’re signing up and the username is already in our database, it will give an error message and it won’t sign you into the feed. 


Choose sign up if you do not yet have an account. The application will make sure the password you choose meets password requirements, verify that it matches the retype password field and save your login information in the database.


After logging in, you will be brought to the homepage which shows you the feed of posts. You can scroll to view more posts, press the reload button to refresh your feed, or choose tags using the buttons on the side. Choosing a button will filter your feed based on your chosen tags. From this page, you can also press the log out button at the top to log out of your account.


There is also a section where you can create your own post, by clicking on the plus sign on the bottom left. When clicking on the button, it shows a textbox where you can add a title, a body, and tags that match your post. The application will notify you if you forget to fill in the title or body fields. After you are done, you can click the post button and then it will show up on the feed with your username and the time, and the text. 
