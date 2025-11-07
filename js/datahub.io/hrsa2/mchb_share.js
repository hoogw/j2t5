


var filter_by = 'no_filter'

var checked_urban_rural_array = []
var checked_rural_array = []
var checked_hrsa_region_array = []
var checked_state_array = []

var current_symbol_fieldName
var more_than_float
var less_than_float

var field_alias = {

              'BF_SMTH':'Breastfeeding Initiation(%)',
              'CSRN_SMTH':'Cesarean Delivery All(%)',
              'NTSV_SMTH':'Cesarean Delivery LowRisk(%)',
              'PRE_DIAB_SMTH':'Diabetes Pre-pregnancy(%)',
              'DIAB_SMTH':'Diabetes Pre-pregnancy or Gestational(%)',
              'PRE_HYP_SMTH':'Hypertension Pre-pregnancy(%)',
              'HYP_SMTH':'Hypertension Pre-pregnancy or Gestational(%)',
              'IMR_SMTH':'Infant Mortality Rate(per 1,000)',
              'LBW_PCT':'Low Birth Weight(%)',
              'OBESE_SMTH':'Obesity Pre-pregnancy(%)',
              'PNC_SMTH':'Prenatal Care in the 1st Trimester(%)',
              'PTB_SMTH':'Preterm Births(%)',
              'SMKD_SMTH':'Smoking During Pregnancy(%)',



              'BLACK_WHITE_RATE_RATIO':'Black-White Infant Mortality Rate Ratio',
              'ANNUAL_BLACK_DEATHS_CURRENT':'Excess Black Infant Deaths',
              'BLACK_IMR':'Infant Mortality Rate-Black Infants(per 1,000)',
              'BLACK_WHITE_RATE_DIFFERENCE':'Infant Mortality Rate-Black-White Difference(per 1,000)',
              'WHITE_IMR':'Infant Mortality Rate-White Infants(per 1,000)',



              'CERT_NRSE_MDWF_RATIO':'Advanced Practice Nurse Midwife Rate(per 100,000)',
              'FML_PRCT_PRDR_RATIO':'Family Medicine Provider Rate(per 100,000)',
              'GEN_PRCT_PRDR_RATIO':'General Practice Provider Rate(per 100,000)',
              'FQHC_COUNTY_CT':'Health Center Service Delivery Sites by County',
              'HOS_W_OB':'Hospitals with Obstetric Care(count)',
              'OB_GEN_PRDR_RATIO':'OB-GYN Provider Rate(per 100,000)',


              'BIRTH_RATE':'Birth Rate(per 1,000)',
              'BIRTHS':'Births(count)',
              'POV_100_PCT':'Households in Poverty (less than 100% of the Poverty Level)(%)',
              'POV_200_PCT':'Households with Low Income (less than 200% of the Poverty Level)(%)',
              'POP_FEMALE_15_44':'Population Count - Women 15-44 Years of Age(count)',
              'POP_SQML':'Population Density Total',
              'POP_FEMALE_15_44_SQML':'Population Density Women 15-44 Years of Age',
              'SDI_SCORE':'Social Deprivation Index (SDI)',
              'UNINS_FEMALE_18_49':'Uninsured Women 18-49 Years of Age(count)',
              'UNINS_FEMALE_18_49_PCT':'Uninsured Women 18-49 Years of Age(%)',
              'POP_HISP_CT':'Women 15-44 Years of Age by Ethnicity(count) Hispanic or Latina',
              'POP_HISP_PCT':'Women 15-44 Years of Age by Ethnicity(%) Hispanic or Latina',
              'POP_NON_HISP_CT':'Women 15-44 Years of Age by Ethnicity(count) Not Hispanic or Latina',
              'POP_NON_HISP_PCT':'Women 15-44 Years of Age by Ethnicity(%) Not Hispanic or Latina',
              'POP_AMERICAN_INDIAN_CT':'Women 15-44 Years of Age by Race(count) American Indian or Alaska Native',
              'POP_AMERICAN_INDIAN_PCT':'Women 15-44 Years of Age by Race(%) American Indian or Alaska Native',
              'POP_ASIAN_CT':'Women 15-44 Years of Age by Race(count) Asian',
              'POP_ASIAN_PCT':'Women 15-44 Years of Age by Race(%) Asian',
              'POP_BLACK_CT':'Women 15-44 Years of Age by Race(count) Black or African American',
              'POP_BLACK_PCT':'Women 15-44 Years of Age by Race(%) Black or African American',
              'POP_MULTI_RACE_CT':'Women 15-44 Years of Age by Race(count) More than one race',
              'POP_MULTI_RACE_PCT':'Women 15-44 Years of Age by Race(%) More than one race',
              'POP_PACIFIC_ISLANDER_CT':'Women 15-44 Years of Age by Race(count) Native Hawaiian or Other Pacific Islander',
              'POP_PACIFIC_ISLANDER_PCT':'Women 15-44 Years of Age by Race(%) Native Hawaiian or Other Pacific Islander',
              'POP_WHITE_CT':'Women 15-44 Years of Age by Race(count) White',
              'POP_WHITE_PCT':'Women 15-44 Years of Age by Race(%) White',



              'NCHS_URBAN_RURAL_DESC':'NCHS Urban-Rural Classification',
              





            }


var urban_rural_array = [
                            'Medium metro',     
                            'Small metro', 
                            'Non-core', 
                            'Large fringe metro', 
                            'Micropolitan', 
                            'Large central metro'
                        ]
    
var rural_array = [
                    'Non-Rural', 
                    'Partially Rural', 
                    'Rural'
                  ]

var hrsa_region_array = [1,2,3,4,5,6,7,8,9,10]

var state_array = [
                        'Alabama',
                        'Alaska',
                        'Arizona',
                        'Arkansas',
                        'California',
                        'Colorado',
                        'Connecticut',
                        'Delaware',
                        'District of Columbia',
                        'Florida',
                        'Georgia',
                        'Hawaii',
                        'Idaho',
                        'Illinois',
                        'Indiana',
                        'Iowa',
                        'Kansas',
                        'Kentucky',
                        'Louisiana',
                        'Maine',
                        'Maryland',
                        'Massachusetts',
                        'Michigan',
                        'Minnesota',
                        'Mississippi',
                        'Missouri',
                        'Montana',
                        'Nebraska',
                        'Nevada',
                        'New Hampshire',
                        'New Jersey',
                        'New Mexico',
                        'New York',
                        'North Carolina',
                        'North Dakota',
                        'Ohio',
                        'Oklahoma',
                        'Oregon',
                        'Pennsylvania',
                        'Rhode Island',
                        'South Carolina',
                        'South Dakota',
                        'Tennessee',
                        'Texas',
                        'Utah',
                        'Vermont',
                        'Virginia',
                        'Washington',
                        'West Virginia',
                        'Wisconsin',
                        'Wyoming',
                        'American Samoa',
                        'Federated States of Micronesia',
                        'Guam',
                        'Marshall Islands',
                        'Northern Mariana Islands',
                        'Republic of Palau',
                        'Puerto Rico',
                        'U.S. Minor Islands',
                        'U.S. Virgin Islands'
                    ]

var state_abbr_array = [
                            'AL',
                            'AK',
                            'AZ',
                            'AR',
                            'CA',
                            'CO',
                            'CT',
                            'DE',
                            'DC',
                            'FL',
                            'GA',
                            'HI',
                            'ID',
                            'IL',
                            'IN',
                            'IA',
                            'KS',
                            'KY',
                            'LA',
                            'ME',
                            'MD',
                            'MA',
                            'MI',
                            'MN',
                            'MS',
                            'MO',
                            'MT',
                            'NE',
                            'NV',
                            'NH',
                            'NJ',
                            'NM',
                            'NY',
                            'NC',
                            'ND',
                            'OH',
                            'OK',
                            'OR',
                            'PA',
                            'RI',
                            'SC',
                            'SD',
                            'TN',
                            'TX',
                            'UT',
                            'VT',
                            'VA',
                            'WA',
                            'WV',
                            'WI',
                            'WY',
                            'AS',
                            'FM',
                            'GU',
                            'MH',
                            'MP',
                            'PW',
                            'PR',
                            'UM',
                            'VI'
                    ]



                   
           


