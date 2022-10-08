# 📚 Reference Data

## Unit Preferences

### ⚖️ Weight Unit

Pounds, Kilograms, Stones

### 🪜 Height Unit

Inches, Centimeters

### 📏 Distance Unit

Miles, Kilometers

### 🌡️ Temperature Unit

Fahrenheit, Celsius

### 🔋 Energy Unit

Calories, Kilocalories

### 🚰 Water Unit

Cups, Fluid Ounces, Milliliters

### 🏃 Activity Level

Not Very Active, Lightly Active, Moderately Active, Very Active, Extremely Active

## 🎯 Goals

### Starting Weight

Value, Weight Unit, Date

### Goal Weight

Value, Weight Unit, Date

### Weekly Goal

Lose .5 lbs per week, Lose 1 lb per week, Lose 2 lbs per week, Maintain weight, Gain .5 lbs per week, Gain 1 lb per week, Gain 2 lbs per week

## 🦊 Considerations

Should the weight measurements and similar be stored to express each of the unit types? For example, if the user has a weight of 185 pounds, should we store the weight in pounds, kilograms, and stone? Or should we just store the weight in pounds along with the unit type and convert to the other units as needed?

Should the time zone be stored in the preference as the object, or just the id?

## ⚙️ Preferences

```json
{
  "preferences": {
    "weightUnit": "pounds",
    "heightUnit": "inches",
    "distanceUnit": "miles",
    "energyUnit": "calories",
    "temperatureUnit": "fahrenheit",
    "waterUnit": "ounces",
    "activityLevel": "lightly active",
    "timezone": ""
  }
}
```

## ⚕️ Health Profile

```json
{
  "healthProfile": {
    "height": {
      "inches": 72,
      "centimeters": 182.88
    },
    "startingWeight": {
      "startDate": "2022-03-14T18:30:12.293Z",
      "pounds": 190,
      "kilograms": 86.18,
      "stone": 13.85
    },
    "currentWeight": {
      "startDate": "2022-03-14T18:30:12.293Z",
      "pounds": 187,
      "kilograms": 84.82,
      "stone": 13.55
    },
    "goalWeight": {
      "weeklyGoal": "example - lose 1 lb per week",
      "pounds": 175,
      "kilograms": 79.38,
      "stones": 12.34
    }
  }
}
```

## Measurements - Weight

```json
{
  "userProfileId": "6320f7a2cb396657bf6b51dd",
  "measurementDate": "2022-03-14T18:30:12.293Z",
  "pounds": 185,
  "kilograms": 83.91,
  "stones": 13.21
}
```
