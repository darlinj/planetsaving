const climateData = [
  {
    "label": "Things you buy",
    "category": "purchasing",
    "color": "orange",
    "colorIntensity": 500,
    "subCategories": [
      {
        "label": "Imported good",
        "category": "import",
        "color": "orange",
        "colorIntensity": 300,
        "emitions": [
          {
            "totalCarbonEmited": 3.2,
            "name": "All imported goods average"
          }
        ]
      }
    ]
  },
  {
    "label": "Transport",
    "category": "transport",
    "color": "red",
    "colorIntensity": 500,
    "subCategories": [
      {
        "label": "Driving",
        "category": "driving",
        "color": "red",
        "colorIntensity": 300,
        "emitions": [
          {
            "totalCarbonEmited": 0.5,
            "name": "Manufacturing the car"
          },
          {
            "totalCarbonEmited": 1,
            "name": "Tail pipe emitions"
          }
        ]
      },
      {
        "label": "Flying",
        "category": "flying",
        "color": "red",
        "colorIntensity": 500,
        "emitions": [
          {
            "totalCarbonEmited": 1,
            "name": "Aviation fuel"
          },
          {
            "totalCarbonEmited": 1,
            "name": "Running the airport"
          }
        ]
      },
      {
        "label": "Train",
        "category": "train",
        "color": "red",
        "colorIntensity": 700,
        "emitions": [
          {
            "totalCarbonEmited": 0.3,
            "name": "Average Train useage"
          }
        ]
      }
    ]
  },
  {
    "label": "Energy",
    "category": "energy",
    "color": "yellow",
    "colorIntensity": 500,
    "subCategories": [
      {
        "label": "Gas",
        "category": "gas",
        "color": "yellow",
        "colorIntensity": 300,
        "emitions": [
          {
            "totalCarbonEmited": 3.2,
            "name": "All gas"
          }
        ]
      }
    ]
  },
  {
    "label": "Schools and hospitals",
    "category": "government",
    "color": "green",
    "colorIntensity": 500,
    "subCategories": [
      {
        "label": "Government",
        "category": "all_gov",
        "color": "green",
        "colorIntensity": 300,
        "emitions": [
          {
            "totalCarbonEmited": 3.2,
            "name": "All government"
          }
        ]
      }
    ]
  },
  {
    "label": "Food",
    "category": "food",
    "color": "blue",
    "colorIntensity": 500,
    "subCategories": [
      {
        "label": "All food",
        "category": "all_food",
        "color": "blue",
        "colorIntensity": 300,
        "emitions": [
          {
            "totalCarbonEmited": 3.2,
            "name": "all food"
          }
        ]
      }
    ]
  }
]

export default climateData