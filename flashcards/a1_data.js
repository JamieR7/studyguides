const a1Params = {
    containerId: 'flashcard-app-root',
    data: [
        { question: "Identify the two main divisions of the nervous system.", answer: "The central nervous system (CNS) and the peripheral nervous system (PNS)." },
        { question: "State the components that make up the central nervous system (CNS).", answer: "The brain and the spinal cord." },
        { question: "Describe the function of the brain within the central nervous system.", answer: "It acts as a central computer for conscious and unconscious activity, processing sensory information and regulating physiological functions." },
        { question: "Outline the role of the spinal cord.", answer: "It enables information to travel between the brain and the rest of the body." },
        { question: "State the composition of the peripheral nervous system (PNS).", answer: "All the nerves located outside of the central nervous system." },
        { question: "Distinguish between sensory and motor nerves.", answer: "Sensory (afferent) nerves inform the CNS about conditions, while motor (efferent) nerves send information from the CNS to tissues and organs." },
        { question: "Identify the division of the motor PNS that controls voluntary movements of skeletal muscles.", answer: "The somatic nervous system." },
        { question: "Identify the division of the motor PNS that regulates involuntary bodily functions like heart rate and digestion.", answer: "The autonomic nervous system." },
        { question: "State the two branches of the autonomic nervous system.", answer: "The sympathetic nervous system and the parasympathetic nervous system." },
        { question: "Describe the general purpose of the sympathetic nervous system during exercise.", answer: "It triggers the 'fight-or-flight' response to help the body meet increased activity demands." },
        { question: "State the effect of sympathetic stimulation on the pupils.", answer: "They dilate." },
        { question: "State the effect of sympathetic stimulation on heart rate.", answer: "It increases." },
        { question: "Identify the response of energy stores during sympathetic nervous system activation.", answer: "Stored energy is released." },
        { question: "Identify the effect of sympathetic stimulation on the sweat glands.", answer: "It activates the sweat response." },
        { question: "State the effect of parasympathetic stimulation on heart rate.", answer: "It lowers the heart rate." },
        { question: "Describe the impact of the parasympathetic nervous system on energy stores.", answer: "It replenishes energy stores." },
        { question: "Identify the effect of parasympathetic stimulation on stress hormones.", answer: "Stress hormones are decreased." },
        { question: "Describe the function of the brain stem.", answer: "It connects the brain and spinal cord, relaying sensory and motor nerve messages between them." },
        { question: "Describe the function of the cerebellum.", answer: "It governs balance and coordinates skilled movements." },
        { question: "State the function of the cerebral cortex for an athlete.", answer: "It allows the athlete to be aware of sensory stimuli and voluntarily control their movements." },
        { question: "Identify the two main structures contained within the diencephalon.", answer: "The thalamus and the hypothalamus." },
        { question: "State the primary importance of the thalamus.", answer: "It is very important for motor control." },
        { question: "Identify the structure that serves as the control center for homeostasis.", answer: "The hypothalamus." },
        { question: "List three physiological processes regulated by the hypothalamus to maintain the internal environment.", answer: "Blood pressure, heart rate, and body temperature." },
        { question: "How does the hypothalamus respond to an increase in blood and internal temperature?", answer: "It triggers vasodilation in skin blood vessels and activates sweat glands to increase evaporative heat loss." },
        { question: "Define 'hormones' as mediator molecules.", answer: "Molecules released in one part of the body that regulate the activity of cells in other parts of the body." },
        { question: "Distinguish between the release sites of hormones and neurotransmitters.", answer: "Hormones are released from glands, while neurotransmitters are released by nerve cells." },
        { question: "Compare the transport method of hormones versus neurotransmitters.", answer: "Hormones are released into the bloodstream, whereas neurotransmitters are released into the synaptic gap." },
        { question: "Distinguish the target proximity for hormones versus neurotransmitters.", answer: "Hormones target areas far from their origin, while neurotransmitters target the area immediately next to their origin." },
        { question: "Compare the speed and duration of the nervous system versus the endocrine system.", answer: "The nervous system is generally quicker but briefer, while the endocrine system responds more slowly with broader, longer-lasting effects." },
        { question: "Identify the gland that secretes epinephrine and norepinephrine.", answer: "The adrenal gland." },
        { question: "Describe the effect of epinephrine on myocardial contractility.", answer: "It increases the contractility of the myocardium, leading to an increase in stroke volume." },
        { question: "Identify the hormones responsible for regulating blood sugar concentration.", answer: "Insulin and glucagon." },
        { question: "State the function of antidiuretic hormone (ADH).", answer: "It regulates water retention in the kidney." },
        { question: "Identify the gland that secretes ADH in response to neural signals from the hypothalamus.", answer: "The pituitary gland." },
        { question: "Define 'homeostasis'.", answer: "A self-regulating biological process aiming to produce a relatively stable, constant internal environment." },
        { question: "Explain the role of negative feedback in homeostasis.", answer: "It is a mechanism that reverses a change back to a controlled, stable condition." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    new FlashcardApp(a1Params);
});
