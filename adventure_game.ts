#! /usr/bin/env node

import inquirer from "inquirer"
import { emit } from "process";

//************************** games variable ************************/

let enemies = ['zombies', 'warrier', 'Skeleton', 'Assassin'];
let maxenemyhealth = 75;
let enemyattackdaamagtohero = 25;


//-------------------player   variable-------------------//

let herohealth = 100;
let attackdamaghealth = 50;
let numhealthportion = 3;
let healthportionamount = 30;
let healthportiondropchance = 50;

//-------------------while loop condition-------------------//

let runninggame = true;

console.log('welocme to deadzone');

Game:
while (runninggame) {
   let enemyhealth = Math.floor(Math.random() * maxenemyhealth + 1);
   let enemyindex = Math.floor(Math.random() * enemies.length);
   let enemy = enemies[enemyindex];
   console.log(`# ${enemy} has appeared #\n`);

   while (enemyhealth > 0) {
      console.log(`  your health ${herohealth}`);
      console.log(`${enemy} health: ${enemyhealth}`);

      let options = await inquirer.prompt([{
         name:'ans',
         type:'list',
         message:'what would you like to do?',
         choices:['Attack','Take health portion','Run']
      }])
      if(options.ans==='Attack'){
         let damagToenemy=Math.floor(Math.random()*attackdamaghealth+1);
         let damagTohero=Math.floor(Math.random()*enemyattackdaamagtohero+1);

         maxenemyhealth-=damagToenemy;
         herohealth-=damagTohero;

         console.log(`you strike the ${enemy} for ${damagToenemy}`);
         console.log(`${enemy} you for ${damagTohero} damage`);

         if(herohealth<1){
            console.log("you have taken too much damag. you are too weak to continue");
            break;
         }
      }
      else if(options.ans==='Take health portion'){
         if(numhealthportion>0){
            herohealth+=healthportionamount;
            numhealthportion--

            console.log(`you use health portion  for  ${healthportionamount}`);
            console.log(`now your health is  ${herohealth}`);
            console.log(`you have ${numhealthportion}`);

         }else{
            console.log(`you have no health portion left.kill enemy to get more health portion.`)
         }
      }
      else if(options.ans==='Run'){
         console.log(`you run away from  ${enemy}`);
         continue  Game;
      }
   }
   if(herohealth<0){
   console.log(`you are  out from battle. you are too weak.`);
   break
   }
   console.log(`${enemy} was defeated`);
   console.log(` you have ${herohealth} health`);

   let randomnumber=Math.floor(Math.random()*100+1);
   if(randomnumber<healthportiondropchance){
         numhealthportion++;

   console.log(`enemy gives you health portion`);
   console.log(`your health is ${herohealth}`);
   console.log(`your health portion is ${numhealthportion}`);
   }
   let userportion=await inquirer.prompt({
      name:'continue',
      type:'list',
      message:'what wuold you llike to continue',
      choices:['1.continue','2.Exit']
   })
   if(userportion.continue==='continue'){
      console.log('you are continue youor adventure');
   }else{
      console.log('you succefully exit from your deadzone');
      break;
   }
   console.log('Thank you for playing\n');
}