import { MongoClient, Db } from 'mongodb';

/*
created_at: { bsonType: 'date' },
updated_at: { bsonType: 'date' }
*/

// Select the database to use.
use('fitness_tracker');

db.createcollection('userprofiles', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'userprofiles',
            required: [
                'emailAddress',
                'password',
                'lastName',
                'firstName',
                'birthDate',
                'gender'
            ],
            properties: {
                emailAddress: {
                    bsonType: 'string'
                },
                password: {
                    bsonType: 'string'
                },
                lastName: {
                    bsonType: 'string'
                },
                firstName: {
                    bsonType: 'string'
                },
                birthDate: {
                    bsonType: 'date'
                },
                gender: {
                    bsonType: 'string'
                },
                preferences: {
                    bsonType: 'object',
                    title: 'preferences',
                    properties: {
                        weightUnit: {
                            bsonType: 'string'
                        },
                        heightUnit: {
                            bsonType: 'string'
                        },
                        distanceUnit: {
                            bsonType: 'string'
                        },
                        energyUnit: {
                            bsonType: 'string'
                        },
                        temperatureUnit: {
                            bsonType: 'string'
                        },
                        waterUnit: {
                            bsonType: 'string'
                        },
                        activityLevel: {
                            bsonType: 'string'
                        },
                        timezone: {
                            bsonType: 'string'
                        }
                    }
                }
            }
        }
    }
});

db.getCollection('userprofiles').createIndex({ 'emailAddress': 1 }, { name: 'unq_user_profile_email_address', unique: true });

