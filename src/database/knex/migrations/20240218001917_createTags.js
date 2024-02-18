exports.up = (knex) => {
  return knex.schema.createTable('movie_tags', (table) => {
    table.increments('id')
    table.text('name').notNullable()
    table
      .integer('movie_id')
      .references('id')
      .inTable('movie_notes')
      .onDelete('CASCADE')
    table.integer('user_id').references('id').inTable('users').onDelete()
  })
}

exports.down = (knex) => knex.schema.dropTable('movie_tags')
