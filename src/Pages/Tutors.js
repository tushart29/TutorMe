import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../CSS/Tutors.css';
import { supabase } from '../Libs/supabaseClient';

export default function Tutors() {
    const [tutors, setTutors] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('name');

    useEffect(() => {
        fetchTutors();
    }, []);

    async function fetchTutors() {
        try {
            let { data: tutors, error } = await supabase
                .from('tutors')
                .select('*')
                .eq('Type', 'Tutor')


            // let { data: tutors, error } = await supabase
            // .from('tutors')
            // .select("*")

            // // Filters
            // .eq('column', 'Equal to')
            // .gt('column', 'Greater than')
            // .lt('column', 'Less than')
            // .gte('column', 'Greater than or equal to')
            // .lte('column', 'Less than or equal to')
            // .like('column', '%CaseSensitive%')
            // .ilike('column', '%CaseInsensitive%')
            // .is('column', null)
            // .in('column', ['Array', 'Values'])
            // .neq('column', 'Not equal to')

            // // Arrays
            // .contains('array_column', ['array', 'contains'])
            // .containedBy('array_column', ['contained', 'by'])



            // .not('role', 'eq', 'Student');

            if (error) {
                throw error;
            }
            setTutors(tutors);
        } catch (error) {
            console.error('Error fetching tutors:', error.message);
        }
    }

    // Function to handle changes in the search input
    function handleSearchInputChange(event) {
        setSearchQuery(event.target.value);
    }

    // Function to handle changes in the filter type dropdown
    function handleFilterTypeChange(event) {
        setFilterType(event.target.value);
    }

    // Filter tutors based on the search query and filter type
    const filteredTutors = tutors ? tutors.filter(tutor => {
        const lowercaseQuery = searchQuery.toLowerCase();
        switch (filterType) {
            case 'name':
                return tutor.name.toLowerCase().includes(lowercaseQuery);
            case 'major':
                return tutor.major.toLowerCase().includes(lowercaseQuery);
            case 'classes':
                return JSON.parse(tutor.subjectsTaught).some(subject =>
                    subject.toLowerCase().includes(lowercaseQuery)
                );
            default:
                return true;
        }
    }) : [];

    return (
        <div>
            <h1 className="tutors-heading">Tutors</h1>
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="search-bar"
            />
            {/* Filter dropdown */}
            <select value={filterType} onChange={handleFilterTypeChange} className="filter-dropdown">
                <option value="name">Name</option>
                <option value="major">Major</option>
                <option value="classes">Classes</option>
            </select>
            <div className="tutor-grid">
                {filteredTutors.map((tutor, index) => (
                    <div key={index} className="tutor-card">
                        <h2>{tutor.name}</h2>
                        <p><strong>Major:</strong> {tutor.major}</p>
                        <p><strong>Email:</strong> {tutor.email}</p>
                        <p><strong>Pay Rate ($/hour):</strong> {tutor.payRate}</p>
                        <p><strong>Classes:</strong> {JSON.parse(tutor.subjectsTaught).join(', ')}</p>
                        <Link to="/Message">Message Me</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
