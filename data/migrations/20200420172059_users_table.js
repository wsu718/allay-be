exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', tbl => {
      tbl.boolean('admin').notNullable().defaultTo(false);  
      tbl.boolean('blocked').notNullable().defaultTo(false);      
    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', tbl => {
        tbl.dropColumn('blocked');
        tbl.dropColumn('admin');       
    });
  };