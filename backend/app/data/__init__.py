import json
import os

from ..schemas.users import UserFullSchema

json_filename = os.path.join(os.path.dirname(__file__), 'data.json')

__all__ = [
    'get_all_tests',
    'create_user',
    'get_user',
]


def get_json_data():
    with open(json_filename, mode='r', encoding='utf8') as json_file:
        json_data = json.load(json_file)
    return json_data


def update_json_data(new_json_data):
    with open(json_filename, mode='w', encoding='utf8') as json_file:
        json.dump(new_json_data, json_file)


def get_all_tests():
    json_data = get_json_data()
    return json_data['tests']


def get_user(username):
    json_data = get_json_data()
    found_user = {}
    for user in json_data['users']:
        if user['username'] == username:
            found_user = user
            break
    if not found_user:
        return None
    return UserFullSchema.model_validate(found_user)


def get_new_user_id():
    json_data = get_json_data()
    id_list = [user['id'] for user in json_data.get('users')]
    if not id_list:
        return 0
    return max(id_list) + 1


def create_user(username, hashed_password):
    json_data = get_json_data()
    if get_user(username):
        return None
    user_id = get_new_user_id()
    new_user = {'id': user_id, 'username': username, 'hashed_password': hashed_password}
    json_data.update({'users': json_data.get('users') + [new_user]})
    update_json_data(json_data)
    return new_user
