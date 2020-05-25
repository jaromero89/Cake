from faker import Faker
import csv

faker = Faker()

def writeToCSV():
    with open(fileName, 'w') as csvfile:
        fieldnames = ['family_id', 'family_name', 'family_DOB', 'family_address', 'family_city', 'family_state', 'family_phonenumber',
                      'family_email','family_gender', 'family_relation',  'imfamily_id','imfamily_name','imfamily_DOB','imfamily_address',
                      'imfamily_city','imfamily_state','imfamily_phonenumber','imfamily_email','imfamily_gender','imfamily_relation',
                      'extfamily_id', 'extfamily_name','extfamily_DOB','extfamily_address', 'extfamily_city', 'extfamily_state',
                      'extfamily_phonenumber', 'extfamily_email', 'extfamily_gender','extfamily_relation', 'friend_id', 'friend_name',
                      'friend_DOB', 'friend_address', 'friend_city', 'friend_state','friend_phonenumber', 'friend_email','friend_gender',
                      'friend_relation', 'acquat_id', 'acquat_name', 'acquat_DOB', 'acquat_address', 'acquat_city','acquat_state',
                      'acquat_phonenumber', 'acquat_email', 'acquat_gender', 'acquat_relation']

        writer = csv.DictWriter(csvfile, fieldnames = fieldnames)

        writer.writeheader()
        for i in range(int(numTuples)):
            writer.writerow(

                {   #Family Information
                    'family_id': faker.id(),             #Nuclear Family  table
                    'family_name': faker.full_name(),
                    'family_DOB': faker.birth_day(),
                    'family_address': faker.address(),
                    'family_city': faker.city(),
                    'family_state': faker.state(),
                    'family_phonenumber': faker.phone_number(),
                    'family_email': faker.email(),
                    'family_gender': faker.gender(),
                    'family_relation': faker.relation(),

                     #Immediate Family Information
                    'imfamily_id': faker.id(),             #Intermediate Family  table
                    'imfamily_name': faker.full_name(),
                    'imfamily_DOB': faker.birth_day(),
                    'imfamily_address': faker.address(),
                    'imfamily_city': faker.city(),
                    'imfamily_state': faker.state(),
                    'imfamily_phonenumber': faker.phone_number(),
                    'imfamily_email': faker.email(),
                    'imfamily_gender': faker.gender(),
                    'imfamily_relation': faker.relation(),
                                                                   # Extended Family table
                    # EXTENDED Family Information
                    'extfamily_id': faker.id(),  # Nuclear Family  table
                    'extfamily_name': faker.full_name(),
                    'extfamily_DOB': faker.birth_day(),
                    'extfamily_address': faker.address(),
                    'extfamily_city': faker.city(),
                    'extfamily_state': faker.state(),
                    'extfamily_phonenumber': faker.phone_number(),
                    'extfamily_email': faker.email(),
                    'extfamily_gender': faker.gender(),
                    'extfamily_relation': faker.relation(),
                                                                   # Friends table
                    # Friends Information
                    'friend_id': faker.id(),  # Nuclear Family  table
                    'friend_name': faker.full_name(),
                    'friend_DOB': faker.birth_day(),
                    'friend_address': faker.address(),
                    'friend_city': faker.city(),
                    'friend_state': faker.state(),
                    'friend_phonenumber': faker.phone_number(),
                    'friend_email': faker.email(),
                    'friend_gender': faker.gender(),
                    'friend_relation': faker.relation(),

                                                                    # Acquaintance table
                    # Friends Information
                    'acquat_id': faker.id(),  # Nuclear Family  table
                    'acquat_name': faker.full_name(),
                    'acquat_DOB': faker.birth_day(),
                    'acquat_address': faker.address(),
                    'acquat_city': faker.city(),
                    'acquat_state': faker.state(),
                    'acquat_phonenumber': faker.phone_number(),
                    'acquat_email': faker.email(),
                    'acquat_gender': faker.gender(),
                    'acquat_relation': faker.relation(),
               }
            )

if __name__ == '__main__':
    fileName = input('Please enter the filename you wish to create: ')
    fileName = fileName + '.csv'
    numTuples = input('Please enter the number of tuples you wish to have: ')
    writeToCSV()