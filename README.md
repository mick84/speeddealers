# SpeedDealers

## Exclusive car rental agency for those, who likes supercars, but didn't buy one for any reason

### The project is at beginning stage, many features must be added.

#### Known bugs

- Date picker: allows to choose wrong dates: past and impossible: ending before beginning
- On date reset(button see all cars): window is reloading for unknown reason
- functionality of check availability button is not implemented
- Admin mode: car data edition is not implemented

### Must be added:

- Local /session storage usage, for caching fetched data
- user logged: option to edit email and password, more authentication methods
- user ordered car: possibility to cancel or change order
- feedback option for logged users, with possibility to edit/delete
- uploading files to DB and retrieving them back, now files are stored in public folder
- normal home page, and more...

## My note:

A lot of time was spent on dealing with the Cloud Firestore, which, as to me, is not the best option for managing data. Should check option to migrate to some SQL database in future.
