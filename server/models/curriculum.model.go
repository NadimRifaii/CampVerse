package models

type Curriculum struct {
	ID         uint `gorm:"primarykey"`
	BootcampID uint
	Title      string `json:"title" gorm:"not null;size:255;unique"`
	Bootcamp   Bootcamp
	Stack      []*Stack `json:"stacks"  gorm:"many2many:curriculum_stacks;"`
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
/*
loop over the stacks , if the stack doesn't exist => creat it and add it to the bootcamp
if the stack does exist , just add it to the bootcamp
*/
