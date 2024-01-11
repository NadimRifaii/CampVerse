package models

type Curriculum struct {
	ID         uint `gorm:"primarykey"`
	BootcampID uint
	Bootcamp   Bootcamp
	Stack      []*Stack `gorm:"many2many:curriculum_stacks;"`
}

/*
1 curriculum can have many stacks
1 stack can be in many curriculum
many to many
*/
/*
1 bootcamp can have one curriculum
1 curriculum is for one bootcamp
one to one
*/
