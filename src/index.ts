import {
  ClassComponent,
  ForwardRefComponent,
  FunctionComponent,
} from "./components";
import {
  generateCode,
  generateComponent,
  motionOrFrameWithmotion,
} from "./generateCode";
import { motion } from "framer-motion";

export function main() {
  console.log(generateComponent(FunctionComponent, { test: 10 }), "\n");
  console.log(generateComponent(ClassComponent, { test: { hoera: 10 } }), "\n");
  console.log(generateComponent(ForwardRefComponent, {}), "\n");

  // This hack is needed because the forwardRef in `motion.div` cannot be resolved into the string `motion.div` again
  Object.assign(motion.div, { name: "motion.div" });
  console.log(
    generateCode(
      motion.div,
      { style: { opacity: 10 } },
      {
        animate: () => {
          return "bla ? 10 : 12";
        },
      },
      [motionOrFrameWithmotion({ animate: "one", style: { opacity: 1 } })]
    ),
    "\n"
  );

  console.log(
    generateCode(
      motion.div,
      { initial: { opacity: 0 } },
      {
        style: () => {
          return {
            opacity: 1,
          };
        },
      }
    )
  );
  console.log(motionOrFrameWithmotion({ style: { opacity: 0.5 } }), "\n");
  console.log(motionOrFrameWithmotion({ style: { border: 10 } }), "\n");
}

main();
