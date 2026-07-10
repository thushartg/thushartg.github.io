/* Real aggregate outputs of the Hadoop Claims Pipeline.
   Written by the Spark ETL job to Hive tables over 150,000 synthetic claims
   (generate_data.py). Numbers below are the actual curated CSV exports. */
window.CLAIMS = {
"meta": {
"total_claims": 150000,
"total_paid_m": 498.6,
"total_billed_m": 756.9,
"gap_pct": 34.1,
"denial_rate": 7.96,
"readmit_rate": 10.16,
"months": "Jan\u2013Jul 2026",
"tables": 6
},
"cost": [
{
"name": "Injury & Trauma",
"paid": 43.21,
"avg": 3398,
"claims": 12716
},
{
"name": "Chronic Kidney Disease",
"paid": 43.09,
"avg": 3407,
"claims": 12645
},
{
"name": "Hypertension",
"paid": 42.81,
"avg": 3403,
"claims": 12580
},
{
"name": "Cardiovascular Disease",
"paid": 41.79,
"avg": 3374,
"claims": 12387
},
{
"name": "Musculoskeletal",
"paid": 41.74,
"avg": 3323,
"claims": 12562
},
{
"name": "Mental Health",
"paid": 41.74,
"avg": 3323,
"claims": 12563
},
{
"name": "Preventive Care",
"paid": 41.54,
"avg": 3307,
"claims": 12561
},
{
"name": "Maternity",
"paid": 41.33,
"avg": 3342,
"claims": 12365
},
{
"name": "Respiratory Illness",
"paid": 40.86,
"avg": 3332,
"claims": 12264
},
{
"name": "Oncology",
"paid": 40.57,
"avg": 3249,
"claims": 12487
},
{
"name": "Infectious Disease",
"paid": 39.99,
"avg": 3183,
"claims": 12563
},
{
"name": "Diabetes",
"paid": 39.92,
"avg": 3244,
"claims": 12307
}
],
"providers": {
"cohort": 5049,
"threshold": 7919,
"rows": [
{
"name": "PRV-00244",
"type": "Physician Office",
"billed": 20555,
"claims": 360,
"outlier": true
},
{
"name": "PRV-00172",
"type": "Hospital",
"billed": 17029,
"claims": 344,
"outlier": true
},
{
"name": "PRV-00150",
"type": "Hospital",
"billed": 14990,
"claims": 393,
"outlier": true
},
{
"name": "PRV-00066",
"type": "Lab",
"billed": 14764,
"claims": 375,
"outlier": true
},
{
"name": "PRV-00296",
"type": "Specialist",
"billed": 14737,
"claims": 374,
"outlier": true
},
{
"name": "PRV-00110",
"type": "Hospital",
"billed": 7224,
"claims": 354,
"outlier": false
},
{
"name": "PRV-00158",
"type": "Specialist",
"billed": 6647,
"claims": 378,
"outlier": false
},
{
"name": "PRV-00393",
"type": "Physician Office",
"billed": 6524,
"claims": 391,
"outlier": false
},
{
"name": "PRV-00138",
"type": "Hospital",
"billed": 6294,
"claims": 391,
"outlier": false
},
{
"name": "PRV-00183",
"type": "Hospital",
"billed": 6234,
"claims": 374,
"outlier": false
}
]
},
"rejections": {
"overall": 7.96,
"denied": 11940,
"by_type": [
{
"name": "Hospital",
"rate": 8.1
},
{
"name": "Lab",
"rate": 8.1
},
{
"name": "Specialist",
"rate": 8.0
},
{
"name": "Urgent Care",
"rate": 7.9
},
{
"name": "Pharmacy",
"rate": 7.8
},
{
"name": "Physician Office",
"rate": 7.7
}
],
"rows": [
{
"name": "Non-covered service",
"claims": 1740,
"billed": 8.38
},
{
"name": "Out-of-network provider",
"claims": 1740,
"billed": 8.41
},
{
"name": "Incomplete documentation",
"claims": 1709,
"billed": 9.5
},
{
"name": "Prior authorization missing",
"claims": 1702,
"billed": 8.76
},
{
"name": "Not medically necessary",
"claims": 1691,
"billed": 8.26
},
{
"name": "Duplicate claim",
"claims": 1685,
"billed": 8.77
},
{
"name": "Coverage terminated",
"claims": 1673,
"billed": 7.37
}
]
},
"readmissions": {
"overall": 10.16,
"rows": [
{
"name": "Chronic Kidney Disease",
"rate": 12.3,
"inpatient": 1029,
"readmits": 127
},
{
"name": "Musculoskeletal",
"rate": 11.7,
"inpatient": 1006,
"readmits": 118
},
{
"name": "Mental Health",
"rate": 11.3,
"inpatient": 995,
"readmits": 112
},
{
"name": "Oncology",
"rate": 11.0,
"inpatient": 980,
"readmits": 108
},
{
"name": "Maternity",
"rate": 10.8,
"inpatient": 1010,
"readmits": 109
},
{
"name": "Cardiovascular Disease",
"rate": 9.9,
"inpatient": 982,
"readmits": 97
},
{
"name": "Hypertension",
"rate": 9.8,
"inpatient": 1023,
"readmits": 100
},
{
"name": "Injury & Trauma",
"rate": 9.4,
"inpatient": 1035,
"readmits": 97
},
{
"name": "Infectious Disease",
"rate": 9.1,
"inpatient": 941,
"readmits": 86
},
{
"name": "Preventive Care",
"rate": 9.1,
"inpatient": 980,
"readmits": 89
},
{
"name": "Diabetes",
"rate": 9.0,
"inpatient": 969,
"readmits": 87
},
{
"name": "Respiratory Illness",
"rate": 8.4,
"inpatient": 996,
"readmits": 84
}
]
},
"monthly": [
{
"m": "2026-01",
"paid": 70.4
},
{
"m": "2026-02",
"paid": 77.3
},
{
"m": "2026-03",
"paid": 87.3
},
{
"m": "2026-04",
"paid": 80.9
},
{
"m": "2026-05",
"paid": 81.4
},
{
"m": "2026-06",
"paid": 84.0
},
{
"m": "2026-07",
"paid": 17.2
}
]
}
;
