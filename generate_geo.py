import argparse
import csv
import json
import sys


def crime_to_feature(crime):
    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                float(crime["Longitude"]),
                float(crime["Latitude"])
            ]
        },
        "properties": {
            "outcome": crime["Last outcome category"]
        }
    }


def convert(inputs, output, crime_type):
    geojson = {
        "type": "FeatureCollection",
        "features": []
        }

    for filename in inputs:
        with open(filename, 'rb') as csvfile:
            crimes = csv.DictReader(csvfile)
            for crime in crimes:
                if crime_type and crime_type != crime['Crime type']:
                    continue
                geojson["features"].append(crime_to_feature(crime))

    return json.dump(geojson, output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create GeoJSON from police.uk crime data")
    parser.add_argument(
        "inputs",
        metavar="csvfile",
        type=str,
        nargs="+",
        help="CSV files to convert")
    parser.add_argument(
        "--output",
        dest="output",
        type=argparse.FileType('w'),
        default=sys.stdout)
    parser.add_argument(
        "--crime-type",
        dest="crime_type",
        type=str,
        nargs="?")

    args = parser.parse_args()

    convert(args.inputs, args.output, args.crime_type)
