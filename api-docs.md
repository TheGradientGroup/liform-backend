API root: https://lifeform-backend.herokuapp.com


# Admin Routes (`/admin`)
## Codes (`/codes`)
### Create (POST `/create`)
Create a DRG code entry, along with mapping.

#### Parameters
* `code`: DRG code of the treatment (String)
* `desc`: Short description of the treatment (String)
* `desc_human`: A user-friendly description of the treatment (optional)

#### Returns
* *Success*: `HTTP 200` with response `{"success": true}`
* *Failure*: `HTTP 401` with response `{"error": "<some error>"}`
    * Error types: `code-already-exists`, `not-all-params-specified`, `db-write-error`, `no-params`

