# membuat aplikasi pengumpulan tugas:

- users: 
  - id
  - username
  - email
  - password
  - role (default: 'user')
  - createdAt
  - updatedAt

- tasks:
  - id
  - titleTask
  - descriptionTask
  - deadline_date
  - createdBy (default: userId - admin)
  - createAt
  - updatedAt

- tugas_user:
  - id
  - userId (default: userId - user)
  - tugasId (default: tugasId)
  - link_tugas
  - createdAt
  - updatedAt 