const b3Params = {
    containerId: 'flashcard-app-root',
    data: [
        { question: "State the definition of 'injury' in a sports science context.", answer: "A reduction or loss of bodily function or structure." },
        { question: "State the definition of 'trauma' as it relates to physical activity.", answer: "The sensation of pain, discomfort, or loss of function reported by the person exercising." },
        { question: "Formula: Magnitude of risk", answer: "Magnitude of risk = Likelihood of risk × Severity of risk" },
        { question: "Distinguish between internal and external risk factors for injury.", answer: "Internal factors are athlete or participant dependent (e.g., age, sex), while external factors relate to the environment or equipment (e.g., playing surface)." },
        { question: "List three examples of internal risk factors for injury.", answer: "Age, sex differences, and previous injury." },
        { question: "List three examples of external risk factors for injury.", answer: "Protective equipment, playing surface, and sporting rules." },
        { question: "Identify the primary internal risk factor associated with skeletal growth in youth sports.", answer: "Age (specifically the adolescent growth period)." },
        { question: "Outline how the 'effects of training' can influence injury risk in cycling.", answer: "The volume of climbing and session duration can increase risk, especially when the ratio between training and competition is high." },
        { question: "Explain why a 'previous injury' increases the likelihood of a recurrent injury.", answer: "It often leads to reduced strength and impaired proprioception (sense of movement and position) which must be fully restored." },
        { question: "Distinguish between the injury rates of biologically male and female athletes regarding ACL injuries.", answer: "Biologically female athletes generally have higher rates of anterior cruciate ligament (ACL) injuries compared to biologically male athletes." },
        { question: "Describe the impact of pregnancy on the musculoskeletal system during exercise.", answer: "Increased body weight increases joint loading, and changes in ligaments and center of gravity can increase the risk of joint injury and falls." },
        { question: "State the focus of strength training for elite athletes in the postpartum period.", answer: "A 'pelvic floor muscle first' focus." },
        { question: "Define 'congenital factors' in the context of sports injury risk.", answer: "Conditions present at the time of birth, such as structural abnormalities or neurological conditions." },
        { question: "Identify the psychological factor that can increase injury risk due to reduced sleep or fatigue.", answer: "Stress (or overall stress levels)." },
        { question: "Outline the role of protective equipment in preventing injuries.", answer: "It aims to absorb and minimize the application of excessive biomechanical forces transmitted to the body." },
        { question: "Distinguish between the injury risks of 'forwards' and 'backs' in rugby union.", answer: "Forwards are at a higher risk of shoulder injury due to the amount and type of tackles/collisions compared to backs." },
        { question: "Identify a common injury type associated with artificial playing surfaces (e.g., AstroTurf).", answer: "Abrasion injury." },
        { question: "Describe how incorrect bike geometry can lead to injury.", answer: "Improper saddle or handlebar height can increase repetitive forces on joints and cause muscles to be shortened or lengthened for prolonged periods." },
        { question: "Define 'laceration injuries' in sports.", answer: "Injuries that occur when the skin or muscle is cut by an external object (e.g., a rugby boot stud)." },
        { question: "Define 'contusion injuries' and their typical clinical presentation.", answer: "Injuries caused by a compressive force to the tissue, often resulting in bleeding known as a haematoma (bruise)." },
        { question: "Describe the mechanism of a 'strain type injury'.", answer: "Muscle into fibres are stretched beyond their normal limit, causing the structure or function of the muscle fibre to be reduced or lost." },
        { question: "Distinguish between acute and chronic (overuse) injuries based on onset.", answer: "Acute injuries occur immediately or suddenly from a single excessive force, while chronic injuries develop over time from repeated applications of force." },
        { question: "Identify three signs or symptoms of a concussion.", answer: "Headache, dizziness, and confusion." },
        { question: "Explain the biomechanical cause of a concussion.", answer: "A direct impact to the head, neck, or face, or an impact elsewhere that transmits mechanical force to the brain." },
        { question: "Syllabus AHL: Define 'biomechanical maladaptation'.", answer: "Inefficient movement patterns that place unnecessary strain on the body and increase the risk of injury." },
        { question: "Syllabus AHL: Outline how a golfer can correct biomechanical maladaptation.", answer: "Through coaching to correct posture, grip, or swing technique to generate power more efficiently." },
        { question: "Syllabus AHL: Explain how muscle imbalances increase injury risk.", answer: "Certain muscles become overactive or underactive, affecting joint stability and increasing the likelihood of strain during activity." },
        { question: "State the two primary goals of interventions related to injury risk.", answer: "To minimize the abnormal application of forces and maximize the body's ability to absorb force." },
        { question: "Define 'prehabilitation' in an athletic context.", answer: "Programmes or exercises designed to better prepare the athlete's body for the forces and ranges of movement involved in sport." },
        { question: "Identify a specific prehabilitation programme designed to reduce injuries in soccer.", answer: "The FIFA 11+ programme." },
        { question: "Explain how rule changes in ice hockey have successfully reduced injury rates.", answer: "The ban on body checking in junior ice hockey resulted in a 50% reduction in injury rate and a 64% reduction in concussion rates." },
        { question: "Distinguish between the RICE and POLICE protocols.", answer: "POLICE replaces 'Rest' with 'Protection' and 'Optimal Loading' to promote better healing." },
        { question: "State the purpose of using ice (cryotherapy) immediately after an injury.", answer: "To reduce inflammation and provide cold-induced analgesia (pain relief)." },
        { question: "Describe the physiological mechanism by which elevation aids injury treatment.", answer: "It uses gravity to aid the return of fluid from the injured area, reducing oedema (swelling)." },
        { question: "State the role of Non-steroidal anti-inflammatory drugs (NSAIDs) in injury treatment.", answer: "To alleviate pain and reduce inflammation." },
        { question: "Outline Stage 1 of the Graduated Return to Sport strategy following a concussion.", answer: "Symptom-limited activity: daily activities that do not provoke symptoms." },
        { question: "Identify the purpose of wearing mouthguards in contact sports.", answer: "To reduce the risk of dental injuries and potentially lower the concussion rate." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    new FlashcardApp(b3Params);
});
