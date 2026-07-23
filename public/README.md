```bash
#Run android app

cd Starzero
npx react-native run-android
Generate Release AAB

cd public 
cd android change version in build.gradle file 
run command ./gradlew bundleRelease
#For iOS

xed ios
change Build Version and Version name
Run Build
Create Archive and Upload


-- For run this project follow below steps:
1. For andorid before running project go to app.json
2. inside "app.json" replace this
{
  "name": "fuelsense",
  "displayName": "FuelSense"
}
3. then run the project with "npm run andorid"

--- For ios Follow below steps:

1. For ios before running project go to app.json
2. inside "app.json" replace this
{
  "name": "STARZero",
  "displayName": "FuelSense"
}

3. then run the project with "npm run ios"
```